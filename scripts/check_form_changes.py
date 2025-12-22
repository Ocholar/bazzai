import requests
import json
import os
import hashlib
from datetime import datetime

FORM_API_URL = "https://forms.office.com/formapi/api/16c73727-979c-4d82-b3a7-eb6a2fddfe57/users/7726dd57-48bb-4c89-9e1e-f2669916f1fe/light/runtimeForms('JzfHFpyXgk2zp-tqL93-V1fdJne7SIlMnh7yZpkW8f5UQzJBMFE5VUpRSzM3VVFNRlJUNkY2QlBIRC4u')?$expand=questions($expand=choices)"
CACHE_FILE = "data/form_definition_cache.json"
WEBHOOK_URL = os.getenv("FORM_CHANGE_WEBHOOK_URL")  # Optional notification

def fetch_form_definition():
    """Fetch current form definition from Microsoft API"""
    response = requests.get(FORM_API_URL)
    response.raise_for_status()
    return response.json()

def load_cache():
    """Load cached form definition"""
    if os.path.exists(CACHE_FILE):
        with open(CACHE_FILE, 'r') as f:
            return json.load(f)
    return None

def save_cache(data):
    """Save form definition to cache"""
    with open(CACHE_FILE, 'w') as f:
        json.dump(data, f, indent=2)

def generate_diff(old, new):
    """Generate human-readable diff between two form definitions"""
    changes = []
    
    old_questions = {q['id']: q for q in old.get('questions', [])}
    new_questions = {q['id']: q for q in new.get('questions', [])}
    
    # Check for new fields
    for qid in new_questions:
        if qid not in old_questions:
            changes.append(f"[NEW FIELD] {new_questions[qid]['title']} (ID: {qid})")
    
    # Check for removed fields
    for qid in old_questions:
        if qid not in new_questions:
            changes.append(f"[REMOVED FIELD] {old_questions[qid]['title']} (ID: {qid})")
    
    # Check for renamed fields
    for qid in old_questions:
        if qid in new_questions:
            if old_questions[qid]['title'] != new_questions[qid]['title']:
                changes.append(f"[RENAMED] {old_questions[qid]['title']} → {new_questions[qid]['title']} (ID: {qid})")
    
    return changes

def notify_changes(changes):
    """Send notification about form changes"""
    if WEBHOOK_URL and changes:
        message = {
            "text": f"🚨 Microsoft Form Structure Changed!\n\n" + "\n".join(changes),
            "timestamp": datetime.now().isoformat()
        }
        try:
            requests.post(WEBHOOK_URL, json=message)
        except Exception as e:
            print(f"Failed to send webhook notification: {e}")

def main():
    print("🔍 Checking for form changes...")
    
    try:
        current = fetch_form_definition()
    except Exception as e:
        print(f"❌ Error fetching form: {e}")
        return
    
    cached = load_cache()
    
    if cached is None:
        print("No cache found. Saving current definition.")
        save_cache(current)
        return
    
    changes = generate_diff(cached, current)
    
    if changes:
        print(f"\n⚠️  {len(changes)} change(s) detected:")
        for change in changes:
            print(f"  - {change}")
        
        # Notify
        notify_changes(changes)
        
        # Prompt to update cache
        update = input("\nUpdate cache? (yes/no): ")
        if update.lower() == 'yes':
            save_cache(current)
            print("✅ Cache updated successfully.")
    else:
        print("✅ No changes detected.")

if __name__ == "__main__":
    main()
