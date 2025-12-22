import requests
import json
import os
import glob

# Configuration
N8N_URL = "https://n8n-production-c726.up.railway.app"
API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMzAzMDZkZS04ZWI0LTQ0YjAtOTQ2MS0yYmU3ODI5ZTc4ZjgiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwiaWF0IjoxNzY0MjQ1MTIwfQ.B77p4BZGK0oze7bDttZuW1r9916XZK37tCiL5UJ3XD8"
# Resolve path relative to this script file
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKFLOWS_DIR = os.path.join(SCRIPT_DIR, "../n8n_workflows")

HEADERS = {
    "X-N8N-API-KEY": API_KEY,
    "Content-Type": "application/json"
}

def get_existing_workflows():
    """Fetch all existing workflows from n8n."""
    try:
        response = requests.get(f"{N8N_URL}/api/v1/workflows", headers=HEADERS)
        response.raise_for_status()
        return {wf["name"]: wf["id"] for wf in response.json()["data"]}
    except Exception as e:
        print(f"Error fetching workflows: {e}")
        return {}

def update_workflow(file_path, existing_workflows):
    """Update or create a workflow from a JSON file."""
    with open(file_path, "r") as f:
        workflow_data = json.load(f)
    
    workflow_name = workflow_data.get("name")
    if not workflow_name:
        print(f"Skipping {file_path}: No 'name' field found.")
        return

    # Prepare payload (n8n API expects 'nodes' and 'connections')
    payload = {
        "name": workflow_name,
        "nodes": workflow_data.get("nodes", []),
        "connections": workflow_data.get("connections", {}),
        "settings": workflow_data.get("settings", {})
    }

    if workflow_name in existing_workflows:
        # Update existing
        workflow_id = existing_workflows[workflow_name]
        print(f"Updating '{workflow_name}' (ID: {workflow_id})...")
        try:
            response = requests.put(f"{N8N_URL}/api/v1/workflows/{workflow_id}", headers=HEADERS, json=payload)
            response.raise_for_status()
            print(f"✅ Successfully updated '{workflow_name}'")
            
            # Ensure it's active
            requests.post(f"{N8N_URL}/api/v1/workflows/{workflow_id}/activate", headers=HEADERS)
            
        except Exception as e:
            print(f"❌ Failed to update '{workflow_name}': {e}")
            if hasattr(e, 'response') and e.response is not None:
                print(f"Response: {e.response.text}")
    else:
        # Create new
        print(f"Creating new workflow '{workflow_name}'...")
        try:
            response = requests.post(f"{N8N_URL}/api/v1/workflows", headers=HEADERS, json=payload)
            response.raise_for_status()
            new_id = response.json()["data"]["id"]
            print(f"✅ Successfully created '{workflow_name}' (ID: {new_id})")
            
            # Activate
            requests.post(f"{N8N_URL}/api/v1/workflows/{new_id}/activate", headers=HEADERS)
            
        except Exception as e:
            print(f"❌ Failed to create '{workflow_name}': {e}")
            if hasattr(e, 'response') and e.response:
                print(e.response.text)

def main():
    print("🚀 Starting n8n Workflow Update...")
    existing_workflows = get_existing_workflows()
    print(f"Found {len(existing_workflows)} existing workflows.")

    # Find all JSON files in the workflows directory
    workflow_files = glob.glob(os.path.join(WORKFLOWS_DIR, "*.json"))
    
    for file_path in workflow_files:
        update_workflow(file_path, existing_workflows)

    print("\n✨ Update Complete!")

if __name__ == "__main__":
    main()
