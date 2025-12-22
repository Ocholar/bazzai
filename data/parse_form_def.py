import json

try:
    with open('form_definition.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    print(f"Form Title: {data.get('title', 'Unknown')}")
    print("-" * 30)

    questions = data.get('questions', [])
    for q in questions:
        print(f"ID: {q.get('id')}")
        print(f"Title: {q.get('title')}")
        print(f"Type: {q.get('type')}")
        if 'choices' in q:
            print("Choices:")
            for c in q['choices']:
                print(f"  - {c.get('description')}")
        print("-" * 30)

except Exception as e:
    print(f"Error: {e}")
