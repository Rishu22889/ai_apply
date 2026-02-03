#!/usr/bin/env python3
"""
Quick test to check if the portal has the new endpoints
"""
import requests

SANDBOX_URL = "https://agent-hire-sandbox.onrender.com"

def test_endpoints():
    """Test if new endpoints are available."""
    
    # Test portal status
    try:
        response = requests.get(f"{SANDBOX_URL}/api/portal/status")
        print(f"Portal Status: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Jobs: {data.get('stats', {}).get('total_jobs', 'unknown')}")
    except Exception as e:
        print(f"Status check failed: {e}")
    
    # Test reset endpoint (POST)
    try:
        response = requests.post(f"{SANDBOX_URL}/api/portal/reset")
        print(f"Reset endpoint: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Reset successful: {data}")
        else:
            print(f"Reset failed: {response.text}")
    except Exception as e:
        print(f"Reset test failed: {e}")

if __name__ == "__main__":
    test_endpoints()