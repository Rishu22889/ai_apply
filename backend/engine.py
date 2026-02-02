"""
Reusable autopilot engine wrapper.
Preserves all original logic from main.py while making it callable as a function.
"""
import json
from pathlib import Path
from typing import Dict, List, Any, Optional

from core.tracker import ApplicationTracker
from backend.job_fetcher import JobFetcher  # Use JobFetcher instead of SandboxJobPortal
from core.scorer import score_job_match
from core.generator import generate_application_content
from schemas.student_schema import StudentArtifactPack
from schemas.job_schema import JobListing
from core.validator import validate_job_for_scoring


def load_json(path):
    """Load JSON data from file path."""
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def run_autopilot(
    student_data: Dict[str, Any],
    jobs_data: List[Dict[str, Any]],
    tracker: Optional[ApplicationTracker] = None,
    original_profile: Optional[Dict[str, Any]] = None,
    apps_today_count: int = 0
) -> Dict[str, Any]:
    """
    Run the autonomous job application engine.
    
    Args:
        student_data: Raw student profile data (will be validated against schema)
        jobs_data: List of raw job listing data (will be validated against schema)
        tracker: Optional existing tracker, creates new one if None
    
    Returns:
        Dict containing:
        - summary: Dict with counts (queued, skipped, submitted, failed, retried)
        - tracker: ApplicationTracker instance with all logged events
        - success: bool indicating if execution completed
        - error: Optional error message if validation failed
    """
    
    # Validate schemas
    try:
        student = StudentArtifactPack(**student_data)
    except Exception as e:
        return {
            "success": False,
            "error": f"Student profile schema validation failed: {e}",
            "summary": {},
            "tracker": None
        }

    jobs = []
    for idx, j in enumerate(jobs_data):
        try:
            jobs.append(JobListing(**j))
        except Exception as e:
            return {
                "success": False,
                "error": f"Job entry #{idx+1} schema validation failed: {e}",
                "summary": {},
                "tracker": None
            }

    # Initialize tracker and job fetcher (for real portal submissions)
    if tracker is None:
        tracker = ApplicationTracker()
    job_fetcher = JobFetcher()  # Use JobFetcher for real HTTP submissions
    print(f"DEBUG: JobFetcher initialized: {type(job_fetcher)}")
    print(f"DEBUG: JobFetcher portal_url: {job_fetcher.portal_url}")

    # Summary counts
    queued, skipped, submitted, failed, retried = 0, 0, 0, 0, 0
    
    # CRITICAL: Initialize apps_today with existing applications from today
    # This ensures daily limit is enforced across multiple autopilot runs
    apps_today = apps_today_count
    print(f"DEBUG: Starting autopilot run with apps_today initialized to {apps_today}")
    
    # Track jobs we've already processed to avoid duplicates
    processed_jobs = set()

    # Process each job (preserving exact original logic)
    for job in jobs:
        job_id = job.job_id
        
        # Skip if we've already processed this job in this run
        if job_id in processed_jobs:
            continue
        processed_jobs.add(job_id)
        
        # CRITICAL: Check daily limit BEFORE any tracking or processing
        if apps_today >= student.constraints.max_apps_per_day:
            print(f"DEBUG: Daily limit reached! Stopping at {apps_today} applications. Job {job_id} will remain for next day.")
            # Don't track this job at all - it should remain as will_apply for next day
            # Just break out of the loop to stop processing more jobs
            break
        
        # Track status "queued" only after daily limit check
        tracker.track(job_id=job_id, status="queued", company=job.company, role=job.role)
        queued += 1

        # Validate job for scoring
        ok, not_allowed_reason = validate_job_for_scoring(student, job, apps_today)
        if not ok:
            tracker.track(job_id=job_id, status="skipped", reason=not_allowed_reason, company=job.company, role=job.role)
            skipped += 1
            continue

        # Score job
        score_result = score_job_match(student, job)
        score = score_result["score"]

        min_score = student.constraints.min_match_score

        if score < min_score:
            reason = f"Score {score:.2f} < required {min_score:.2f}"
            tracker.track(job_id=job_id, status="skipped", reason=reason, company=job.company, role=job.role)
            skipped += 1
            continue

        # Generate application content
        app_content, skip_reason = generate_application_content(student, job)
        if app_content is None:
            tracker.track(job_id=job_id, status="skipped", reason=skip_reason, company=job.company, role=job.role)
            skipped += 1
            continue

        # CRITICAL: Check daily limit again before incrementing and applying
        if apps_today >= student.constraints.max_apps_per_day:
            print(f"DEBUG: Daily limit reached during processing! Stopping at {apps_today} applications.")
            # Mark this job as skipped due to daily limit so it can be retried tomorrow
            tracker.track(job_id=job_id, status="skipped", reason=f"Daily limit of {student.constraints.max_apps_per_day} applications reached", company=job.company, role=job.role)
            skipped += 1
            break

        # Increment counter BEFORE attempting application
        apps_today += 1
        print(f"DEBUG: Applying to job {job_id} (application #{apps_today})")

        # Compose application dict for submission to sandbox portal
        # Convert our internal format to sandbox portal format
        basic_info = {}
        if original_profile:
            basic_info = original_profile.get("basic_info", {})
        
        application_for_portal = {
            "applicant_name": basic_info.get("name", "AI Job Applicant"),
            "email": basic_info.get("email", "ai.applicant@example.com"), 
            "cover_letter": app_content.get("cover_paragraph", "I am interested in this position."),
            "skills": ", ".join(student.skill_vocab[:10]),  # Convert skills list to comma-separated string
            "phone": basic_info.get("phone", ""),
            "location": basic_info.get("location", ""),
            "current_role": "Job Seeker",
            "education": ", ".join([edu.institution for edu in getattr(student, "education", [])]),
            "availability": "Immediate",
            "salary_expectation": "Negotiable"
        }

        # Submit to sandbox portal via HTTP (with retry logic)
        try:
            print(f"DEBUG: About to submit application for job {job_id}")
            print(f"DEBUG: Application data: {application_for_portal}")
            submission_result = job_fetcher.submit_application(job_id, application_for_portal)
            print(f"DEBUG: Submission result: {submission_result}")
            tracker.track(
                job_id=job_id,
                status="submitted",
                receipt_id=submission_result.get("receipt_id"),
                company=job.company,
                role=job.role
            )
            submitted += 1
        except Exception as e1:
            try:
                submission_result = job_fetcher.submit_application(job_id, application_for_portal)
                tracker.track(
                    job_id=job_id,
                    status="retried",
                    receipt_id=submission_result.get("receipt_id"),
                    company=job.company,
                    role=job.role
                )
                retried += 1
            except Exception as e2:
                tracker.track(
                    job_id=job_id,
                    status="failed",
                    reason=f"Submission failed twice: {e2}",
                    company=job.company,
                    role=job.role
                )
                failed += 1

    summary = {
        "queued": queued,
        "skipped": skipped,
        "submitted": submitted,
        "retried": retried,
        "failed": failed
    }

    return {
        "success": True,
        "error": None,
        "summary": summary,
        "tracker": tracker
    }


def run_autopilot_from_files(
    student_path: str = "data/student_profile.json",
    jobs_path: str = "data/jobs.json"
) -> Dict[str, Any]:
    """
    Run autopilot using file paths (backward compatibility with original main.py).
    
    Args:
        student_path: Path to student profile JSON
        jobs_path: Path to jobs JSON
    
    Returns:
        Same as run_autopilot()
    """
    try:
        student_data = load_json(student_path)
        jobs_data = load_json(jobs_path)
        return run_autopilot(student_data, jobs_data)
    except Exception as e:
        return {
            "success": False,
            "error": f"Failed to load files: {e}",
            "summary": {},
            "tracker": None
        }