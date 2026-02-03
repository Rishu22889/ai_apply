"""
Basic tests for AI Apply system
"""
import pytest
import sys
import os

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def test_imports():
    """Test that core modules can be imported."""
    try:
        # Add project root to path if not already there
        import sys
        import os
        project_root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        if project_root not in sys.path:
            sys.path.insert(0, project_root)
        
        from core.tracker import ApplicationTracker
        from core.scorer import score_job_match
        from core.validator import validate_job_for_scoring
        from schemas.student_schema import StudentArtifactPack
        from schemas.job_schema import JobListing
        assert True
    except ImportError as e:
        pytest.fail(f"Failed to import core modules: {e}")
    except Exception as e:
        pytest.fail(f"Unexpected error during import: {e}")


def test_application_tracker():
    """Test ApplicationTracker basic functionality."""
    from core.tracker import ApplicationTracker
    
    tracker = ApplicationTracker()
    
    # Test tracking an application
    tracker.track(
        job_id="test-job-001",
        status="queued",
        company="Test Company",
        role="Software Engineer"
    )
    
    applications = tracker.get_applications()
    assert len(applications) == 1
    assert applications[0]["job_id"] == "test-job-001"
    assert applications[0]["status"] == "queued"
    assert applications[0]["company"] == "Test Company"
    assert applications[0]["role"] == "Software Engineer"


def test_job_schema():
    """Test JobListing schema validation."""
    from schemas.job_schema import JobListing
    
    # Valid job data
    job_data = {
        "job_id": "test-001",
        "company": "Test Company",
        "role": "Software Engineer",
        "location": "Remote",
        "required_skills": ["python", "javascript"],
        "min_experience_years": 2
    }
    
    job = JobListing(**job_data)
    assert job.job_id == "test-001"
    assert job.company == "Test Company"
    assert job.role == "Software Engineer"
    assert "python" in job.required_skills


def test_student_schema():
    """Test StudentArtifactPack schema validation."""
    from schemas.student_schema import StudentArtifactPack, Constraints
    
    # Valid student data
    constraints = Constraints(
        max_apps_per_day=5,
        min_match_score=0.7,
        blocked_companies=[]
    )
    
    student_data = {
        "source_resume_hash": "test-hash-123",
        "skill_vocab": ["python", "javascript", "react"],
        "education": [],
        "projects": [],
        "constraints": constraints
    }
    
    student = StudentArtifactPack(**student_data)
    assert student.source_resume_hash == "test-hash-123"
    assert "python" in student.skill_vocab
    assert student.constraints.max_apps_per_day == 5


def test_system_health():
    """Test basic system health checks."""
    # Test that required directories exist
    required_dirs = ["backend", "frontend", "core", "schemas", "sandbox"]
    
    for dir_name in required_dirs:
        assert os.path.exists(dir_name), f"Required directory {dir_name} not found"
    
    # Test that key files exist
    required_files = [
        "requirements.txt",
        "backend/app.py",
        "core/tracker.py",
        "schemas/job_schema.py",
        "schemas/student_schema.py"
    ]
    
    for file_name in required_files:
        assert os.path.exists(file_name), f"Required file {file_name} not found"


if __name__ == "__main__":
    pytest.main([__file__])