#!/usr/bin/env python3
"""
Production server for AI Apply backend
Optimized for Render deployment
"""
import os
import sys
import uvicorn
from pathlib import Path

# Add the project root to Python path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

# Set environment variables for production
os.environ.setdefault('SANDBOX_URL', 'https://agent-hire-sandbox.onrender.com')

# Import the FastAPI app
from backend.app import app

if __name__ == "__main__":
    # Get port from environment (Render sets this automatically)
    port = int(os.environ.get("PORT", 8001))
    
    # Create necessary directories
    os.makedirs("data", exist_ok=True)
    os.makedirs("logs", exist_ok=True)
    
    print(f"🚀 Starting AI Apply Backend on port {port}")
    print(f"📁 Working directory: {os.getcwd()}")
    print(f"🐍 Python path: {sys.path[:3]}...")
    print(f"🌐 Sandbox URL: {os.environ.get('SANDBOX_URL')}")
    
    # Run the server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=port,
        log_level="info",
        access_log=True
    )