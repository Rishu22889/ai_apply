#!/usr/bin/env python3
"""
Job Management Script for Sandbox Portal
Helps you manage jobs in the deployed sandbox portal
"""
import requests
import json
import sys

# Update this URL to your deployed sandbox portal
SANDBOX_URL = "https://agent-hire-sandbox.onrender.com"

def check_portal_status():
    """Check if the portal is running."""
    try:
        response = requests.get(f"{SANDBOX_URL}/api/portal/status")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Portal is running: {data}")
            return True
        else:
            print(f"❌ Portal returned status {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Failed to connect to portal: {e}")
        return False

def list_jobs():
    """List all jobs in the portal."""
    try:
        response = requests.get(f"{SANDBOX_URL}/api/jobs")
        if response.status_code == 200:
            data = response.json()
            jobs = data.get('jobs', [])
            print(f"\n📋 Found {len(jobs)} jobs:")
            for i, job in enumerate(jobs[:10], 1):  # Show first 10
                print(f"{i}. {job['company']} - {job['role']} ({job['location']}) - {job['salary_range']}")
            if len(jobs) > 10:
                print(f"... and {len(jobs) - 10} more jobs")
            return jobs
        else:
            print(f"❌ Failed to get jobs: {response.status_code}")
            return []
    except Exception as e:
        print(f"❌ Error getting jobs: {e}")
        return []

def reset_portal():
    """Reset the portal with fresh jobs."""
    try:
        response = requests.post(f"{SANDBOX_URL}/api/portal/reset")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Portal reset successfully: {data}")
            return True
        else:
            print(f"❌ Failed to reset portal: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error resetting portal: {e}")
        return False

def delete_job(job_id):
    """Delete a specific job."""
    try:
        response = requests.delete(f"{SANDBOX_URL}/api/jobs/{job_id}")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Job deleted: {data}")
            return True
        else:
            print(f"❌ Failed to delete job: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error deleting job: {e}")
        return False

def clear_all_jobs():
    """Clear all jobs from the portal."""
    try:
        response = requests.delete(f"{SANDBOX_URL}/api/jobs/clear-all")
        if response.status_code == 200:
            data = response.json()
            print(f"✅ All jobs cleared: {data}")
            return True
        else:
            print(f"❌ Failed to clear jobs: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Error clearing jobs: {e}")
        return False

def main():
    """Main menu for job management."""
    print("🎯 Sandbox Portal Job Manager")
    print("=" * 40)
    
    if not check_portal_status():
        print("Please make sure the sandbox portal is running.")
        return
    
    while True:
        print("\nOptions:")
        print("1. List jobs")
        print("2. Reset portal (reinitialize with 100+ jobs)")
        print("3. Delete specific job")
        print("4. Clear all jobs")
        print("5. Check portal status")
        print("6. Exit")
        
        choice = input("\nEnter your choice (1-6): ").strip()
        
        if choice == "1":
            list_jobs()
        elif choice == "2":
            reset_portal()
        elif choice == "3":
            job_id = input("Enter job ID to delete (e.g., job-001): ").strip()
            if job_id:
                delete_job(job_id)
        elif choice == "4":
            confirm = input("Are you sure you want to clear ALL jobs? (yes/no): ").strip().lower()
            if confirm == "yes":
                clear_all_jobs()
        elif choice == "5":
            check_portal_status()
        elif choice == "6":
            print("👋 Goodbye!")
            break
        else:
            print("❌ Invalid choice. Please try again.")

if __name__ == "__main__":
    main()