#!/usr/bin/env python3
"""
Production server for AI Apply Sandbox Portal
Optimized for Render deployment
"""
import os
import sys
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Import the Flask app
from sandbox.job_portal import app

if __name__ == "__main__":
    # Get port from environment (Render sets this automatically)
    port = int(os.environ.get("PORT", 5001))
    
    print(f"🚀 Starting AI Apply Sandbox Portal on port {port}")
    print(f"📁 Working directory: {os.getcwd()}")
    
    # Run the Flask server
    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )