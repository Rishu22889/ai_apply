"""
Simple CI test in root directory to verify pytest works
"""

def test_ci_basic():
    """Basic test that should always pass."""
    assert True

def test_ci_math():
    """Simple math test."""
    assert 1 + 1 == 2

def test_ci_string():
    """Simple string test."""
    assert "hello" == "hello"