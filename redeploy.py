#!/usr/bin/env python3
"""
Redeployment script for fixing the Unknown applications issue.
This script commits the latest fixes and triggers redeployment.
"""

import subprocess
import sys
import os
from datetime import datetime

def run_command(command, description):
    """Run a command and handle errors."""
    print(f"🔧 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode != 0:
            print(f"❌ Failed: {result.stderr}")
            return False
        if result.stdout.strip():
            print(f"✅ {result.stdout.strip()}")
        return True
    except Exception as e:
        print(f"❌ Error: {e}")
        return False

def main():
    """Main redeployment process."""
    
    print("🚀 Starting redeployment process...")
    print(f"📅 Timestamp: {datetime.now().isoformat()}")
    
    # Check git status
    if not run_command("git status --porcelain", "Checking git status"):
        return False
    
    # Add any new files
    if not run_command("git add .", "Adding new files"):
        return False
    
    # Commit changes
    commit_message = f"Fix Unknown applications issue - {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    if not run_command(f'git commit -m "{commit_message}"', "Committing changes"):
        print("ℹ️ No changes to commit or commit failed")
    
    # Push to trigger deployment
    if not run_command("git push origin main", "Pushing to trigger deployment"):
        return False
    
    print("\n🎉 Redeployment triggered successfully!")
    print("\n📋 Next steps:")
    print("1. Wait for deployment to complete (check GitHub Actions)")
    print("2. Verify backend is running with latest code")
    print("3. Test application creation to ensure company/role are captured")
    print("4. Run fix_unknown_applications.py if needed to clean up old data")
    
    print("\n🔗 Deployment URLs:")
    print("   Backend: https://agent-hire-backend.onrender.com")
    print("   Frontend: https://agenthire-ten.vercel.app")
    print("   Sandbox: https://agent-hire-sandbox.onrender.com")
    
    return True

if __name__ == "__main__":
    try:
        success = main()
        sys.exit(0 if success else 1)
    except KeyboardInterrupt:
        print("\n⚠️ Deployment cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Deployment failed: {e}")
        sys.exit(1)