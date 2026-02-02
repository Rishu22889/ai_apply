#!/usr/bin/env python3
"""
Restart the sandbox portal to ensure it has all jobs initialized.
"""
import subprocess
import time
import requests
import sys

def restart_portal():
    print("🔄 Restarting sandbox portal...")
    
    # Kill existing portal processes
    try:
        subprocess.run(["pkill", "-f", "job_portal.py"], check=False)
        time.sleep(2)
    except:
        pass
    
    # Start new portal process
    print("🚀 Starting new portal...")
    process = subprocess.Popen([
        sys.executable, "sandbox/job_portal.py"
    ], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    # Wait for portal to start
    print("⏳ Waiting for portal to initialize...")
    for i in range(30):  # Wait up to 30 seconds
        try:
            response = requests.get("http://localhost:5001/api/jobs", timeout=5)
            if response.status_code == 200:
                jobs = response.json()
                print(f"✅ Portal started with {len(jobs)} jobs")
                return True
        except:
            pass
        time.sleep(1)
        print(f"   Waiting... ({i+1}/30)")
    
    print("❌ Portal failed to start properly")
    return False

if __name__ == "__main__":
    restart_portal()