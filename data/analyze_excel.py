import pandas as pd
import os
import json

# File path
data_dir = r'c:\Users\Administrator\Documents\Antigravity\bazz-ai-backend\data'
filename = "ENTERPRISE ODU SALES TRACKER 2025 -- NOV'26.xlsx"
filepath = os.path.join(data_dir, filename)

output_file = os.path.join(data_dir, "analysis_results.txt")

with open(output_file, 'w', encoding='utf-8') as f:
    f.write("=" * 80 + "\n")
    f.write("EXCEL FILE ANALYSIS\n")
    f.write("=" * 80 + "\n\n")
    
    # Load Excel file
    xl = pd.ExcelFile(filepath)
    
    f.write(f"Total sheets: {len(xl.sheet_names)}\n\n")
    f.write("SHEET NAMES:\n")
    for i, sheet in enumerate(xl.sheet_names, 1):
        f.write(f"{i}. {sheet}\n")
    
    # Analyze each sheet
    for sheet_name in xl.sheet_names:
        f.write(f"\n{'='*80}\n")
        f.write(f"SHEET: {sheet_name}\n")
        f.write(f"{'='*80}\n\n")
        
        df = pd.read_excel(filepath, sheet_name=sheet_name)
        
        f.write(f"Dimensions: {df.shape[0]} rows × {df.shape[1]} columns\n\n")
        
        f.write("COLUMNS:\n")
        for col in df.columns:
            f.write(f"  - {col}\n")
        
        f.write(f"\nSAMPLE DATA (first 5 rows):\n")
        f.write(df.head(5).to_string() + "\n")
        
        # Summary statistics for numeric columns
        numeric_cols = df.select_dtypes(include=['number']).columns
        if len(numeric_cols) > 0:
            f.write(f"\nNUMERIC COLUMN STATISTICS:\n")
            f.write(df[numeric_cols].describe().to_string() + "\n")
        
        # Value counts for key columns
        for col in df.columns:
            if 'status' in col.lower() or 'type' in col.lower() or 'category' in col.lower():
                f.write(f"\nVALUE COUNTS FOR '{col}':\n")
                f.write(df[col].value_counts().head(10).to_string() + "\n")

print(f"Analysis saved to: {output_file}")
print("Opening file...")
