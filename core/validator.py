from typing import Tuple
from schemas.student_schema import StudentArtifactPack
from schemas.job_schema import JobListing

def validate_job_for_scoring(
    student: StudentArtifactPack,
    job: JobListing,
    apps_today: int
) -> Tuple[bool, str]:
    """
    Determines whether a job should be considered for scoring or skipped.

    Args:
        student (StudentArtifactPack): The student's artifact record.
        job (JobListing): The job listing being considered.
        apps_today (int): The number of applications made by the student today.

    Returns:
        (allowed: bool, reason: str): Whether the job is allowed and reason for skip if not.
    """

    constraints = student.constraints
    skill_vocab = set(student.skill_vocab)

    if not student.constraints:
        return (False, "Student constraints not defined; refusing to score job.")

    # 1. Blocked company check
    if constraints and job.company in getattr(constraints, "blocked_companies", []):
        return (False, f"Company '{job.company}' is in the student's blocked_companies list.")

    # 2. Applications per day limit check - REMOVED
    # This is now handled in the engine to properly stop processing and keep remaining jobs as will_apply

    # 3. Unknown required skill check (case-insensitive, allow partial matches)
    skill_vocab_lower = set(skill.lower() for skill in skill_vocab)
    unknown_skills = [s for s in job.required_skills if s.lower() not in skill_vocab_lower]
    
    # Allow jobs if user has at least 50% of required skills, or if it's an entry-level position
    required_skills_count = len(job.required_skills)
    matched_skills_count = required_skills_count - len(unknown_skills)
    match_ratio = matched_skills_count / required_skills_count if required_skills_count > 0 else 1.0
    
    # Be more lenient for skill matching - allow more applications
    min_match_threshold = 0.2 if job.min_experience_years == 0 else 0.3
    
    if match_ratio < min_match_threshold:
        return (
            False,
            f"Job requires {required_skills_count} skills but user only matches {matched_skills_count} ({match_ratio:.1%}). Missing: {unknown_skills}"
        )

    # 4. Experience requirement check - be more lenient
    # Allow applying to jobs requiring up to 2 years of experience
    # since students often have project experience that counts
    if job.min_experience_years > 2:
        return (False, f"Job requires {job.min_experience_years} years of experience, which exceeds the 2-year limit for student applications")

    # If all checks pass
    return (True, "Job passes all hard validation gates.")