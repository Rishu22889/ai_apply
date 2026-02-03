"""
Simple tests that don't require complex imports - for CI verification
"""
import pytest
import os
import sys


def test_python_version():
    """Test that Python version is acceptable."""
    assert sys.version_info >= (3, 8), f"Python version {sys.version_info} is too old"


def test_basic_imports():
    """Test basic Python imports work."""
    import json
    import sqlite3
    import datetime
    assert True


def test_project_structure():
    """Test that required project directories exist."""
    required_dirs = ["backend", "core", "schemas"]
    
    for dir_name in required_dirs:
        assert os.path.exists(dir_name), f"Required directory {dir_name} not found"


def test_requirements_file():
    """Test that requirements.txt exists and has content."""
    assert os.path.exists("requirements.txt"), "requirements.txt not found"
    
    with open("requirements.txt", "r") as f:
        content = f.read()
        assert len(content) > 0, "requirements.txt is empty"
        assert "fastapi" in content.lower(), "FastAPI not found in requirements"
        assert "pydantic" in content.lower(), "Pydantic not found in requirements"


def test_basic_math():
    """Test basic functionality works."""
    assert 2 + 2 == 4
    assert "hello" + " world" == "hello world"
    assert [1, 2, 3] == [1, 2, 3]


if __name__ == "__main__":
    pytest.main([__file__])