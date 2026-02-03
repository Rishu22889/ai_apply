#!/usr/bin/env python3
"""
Fix script to update "Unknown" applications with proper company/role information.
This script fetches job details from the sandbox portal and updates existing application history.
"""

import sys
import os
import json
import sqlite3
from datetime import datetime

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.database import PersistentDatabase
from backend.job_fetcher import JobFetcher

def fix_unknown_applications():
    """Fix applications with Unknown company/role by fetching from sandbox portal."""
    
    print("🔧 Starting fix for Unknown applications...")
    
    # Initialize database and job fetcher
    db = PersistentDatabase("data/platform.db")
    job_fetcher = JobFetcher()
    
    # Check if sandbox portal is available
    portal_status = job_fetcher.check_portal_status()
    if portal_status.get("status") != "active":
        print("❌ Sandbox portal is not available. Cannot fetch job details.")
        print(f"Portal status: {portal_status}")
        return False
    
    print("✅ Sandbox portal is active")
    
    # Fetch all jobs from portal to create a lookup map
    print("📋 Fetching jobs from sandbox portal...")
    portal_jobs = job_fetcher.fetch_jobs(filters={"limit": 1000})
    
    if not portal_jobs:
        print("❌ No jobs found in sandbox portal")
        return False
    
    print(f"📋 Found {len(portal_jobs)} jobs in sandbox portal")
    
    # Create job lookup map
    job_lookup = {}
    for portal_job in portal_jobs:
        job_id = portal_job.get("id") or portal_job.get("job_id")
        if job_id:
            job_lookup[str(job_id)] = {
                "company": portal_job.get("company", "Unknown"),
                "role": portal_job.get("position", portal_job.get("role", "Unknown"))
            }
    
    print(f"📝 Created lookup map for {len(job_lookup)} jobs")
    
    # Get all applications with Unknown company or role
    with db.get_connection() as conn:
        cursor = conn.cursor()
        
        # Find applications with Unknown company or role
        cursor.execute("""
            SELECT id, job_id, company, role, user_id, timestamp
            FROM application_history 
            WHERE company = 'Unknown' OR role = 'Unknown'
            ORDER BY timestamp DESC
        """)
        
        unknown_applications = cursor.fetchall()
        
        if not unknown_applications:
            print("✅ No applications with Unknown company/role found")
            return True
        
        print(f"🔍 Found {len(unknown_applications)} applications with Unknown company/role")
        
        updated_count = 0
        not_found_count = 0
        
        for app_id, job_id, current_company, current_role, user_id, timestamp in unknown_applications:
            # Look up job details
            job_details = job_lookup.get(str(job_id))
            
            if job_details:
                new_company = job_details["company"]
                new_role = job_details["role"]
                
                # Update the application
                cursor.execute("""
                    UPDATE application_history 
                    SET company = ?, role = ?
                    WHERE id = ?
                """, (new_company, new_role, app_id))
                
                updated_count += 1
                print(f"✅ Updated application {app_id}: {job_id} -> {new_company} - {new_role}")
            else:
                not_found_count += 1
                print(f"⚠️ Job {job_id} not found in portal (application {app_id})")
        
        conn.commit()
        
        print(f"\n📊 Fix Summary:")
        print(f"   ✅ Updated: {updated_count} applications")
        print(f"   ⚠️ Not found: {not_found_count} applications")
        print(f"   📝 Total processed: {len(unknown_applications)} applications")
        
        return updated_count > 0

def clear_all_unknown_applications():
    """Alternative: Clear all applications with Unknown company/role."""
    
    print("🗑️ Clearing all Unknown applications...")
    
    db = PersistentDatabase("data/platform.db")
    
    with db.get_connection() as conn:
        cursor = conn.cursor()
        
        # Count applications to be deleted
        cursor.execute("""
            SELECT COUNT(*) FROM application_history 
            WHERE company = 'Unknown' OR role = 'Unknown'
        """)
        count = cursor.fetchone()[0]
        
        if count == 0:
            print("✅ No Unknown applications to clear")
            return True
        
        print(f"🗑️ Found {count} Unknown applications to clear")
        
        # Delete Unknown applications
        cursor.execute("""
            DELETE FROM application_history 
            WHERE company = 'Unknown' OR role = 'Unknown'
        """)
        
        deleted_count = cursor.rowcount
        conn.commit()
        
        print(f"✅ Cleared {deleted_count} Unknown applications")
        return True

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Fix Unknown applications in database")
    parser.add_argument("--clear", action="store_true", help="Clear all Unknown applications instead of fixing them")
    args = parser.parse_args()
    
    try:
        if args.clear:
            success = clear_all_unknown_applications()
        else:
            success = fix_unknown_applications()
        
        if success:
            print("\n🎉 Fix completed successfully!")
        else:
            print("\n❌ Fix failed or no changes made")
            sys.exit(1)
            
    except Exception as e:
        print(f"\n❌ Error during fix: {e}")
        import traceback
        traceback.print_exc()
        sys.exit(1)