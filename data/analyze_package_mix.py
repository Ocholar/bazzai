import pandas as pd
import os

# File path
data_dir = r'c:\Users\Administrator\Documents\Antigravity\bazz-ai-backend\data'
filename = "ENTERPRISE ODU SALES TRACKER 2025 -- NOV'26.xlsx"
filepath = os.path.join(data_dir, filename)

print("=" * 80)
print("PACKAGE MIX ANALYSIS - 15Mbps vs 30Mbps")
print("=" * 80)

# Read the NOV DUMP sheet (has package preferences)
df_nov = pd.read_excel(filepath, sheet_name='NOV DUMP')

print(f"\nTotal leads in NOV DUMP: {len(df_nov)}")

# Check package column
if 'Customer Preferred Package' in df_nov.columns:
    package_counts = df_nov['Customer Preferred Package'].value_counts()
    
    print("\nPACKAGE PREFERENCES:")
    print("-" * 80)
    for package, count in package_counts.items():
        percentage = (count / len(df_nov)) * 100
        print(f"{package}: {count} ({percentage:.1f}%)")
    
    # Calculate 15Mbps vs 30Mbps
    mbps_15 = df_nov[df_nov['Customer Preferred Package'].str.contains('15Mbps', na=False, case=False)]
    mbps_30 = df_nov[df_nov['Customer Preferred Package'].str.contains('30Mbps', na=False, case=False)]
    
    total_with_package = len(mbps_15) + len(mbps_30)
    
    if total_with_package > 0:
        print("\n" + "=" * 80)
        print("15Mbps vs 30Mbps BREAKDOWN:")
        print("=" * 80)
        print(f"15Mbps: {len(mbps_15)} ({(len(mbps_15)/total_with_package)*100:.1f}%)")
        print(f"30Mbps: {len(mbps_30)} ({(len(mbps_30)/total_with_package)*100:.1f}%)")
        print(f"Total: {total_with_package}")

# Also check OCT DUMP
print("\n" + "=" * 80)
print("CHECKING OCTOBER DATA")
print("=" * 80)

df_oct = pd.read_excel(filepath, sheet_name='OCT DUMP')
print(f"\nTotal leads in OCT DUMP: {len(df_oct)}")

if 'Customer Preferred Package' in df_oct.columns:
    package_counts_oct = df_oct['Customer Preferred Package'].value_counts()
    
    print("\nPACKAGE PREFERENCES (OCT):")
    print("-" * 80)
    for package, count in package_counts_oct.head(10).items():
        percentage = (count / len(df_oct)) * 100
        print(f"{package}: {count} ({percentage:.1f}%)")
    
    # Calculate 15Mbps vs 30Mbps
    mbps_15_oct = df_oct[df_oct['Customer Preferred Package'].str.contains('15Mbps', na=False, case=False)]
    mbps_30_oct = df_oct[df_oct['Customer Preferred Package'].str.contains('30Mbps', na=False, case=False)]
    
    total_with_package_oct = len(mbps_15_oct) + len(mbps_30_oct)
    
    if total_with_package_oct > 0:
        print("\n" + "=" * 80)
        print("15Mbps vs 30Mbps BREAKDOWN (OCT):")
        print("=" * 80)
        print(f"15Mbps: {len(mbps_15_oct)} ({(len(mbps_15_oct)/total_with_package_oct)*100:.1f}%)")
        print(f"30Mbps: {len(mbps_30_oct)} ({(len(mbps_30_oct)/total_with_package_oct)*100:.1f}%)")
        print(f"Total: {total_with_package_oct}")

# Check ACTIVATED LEADS for actual package distribution
print("\n" + "=" * 80)
print("CHECKING ACTIVATED LEADS (ACTUAL SALES)")
print("=" * 80)

df_activated = pd.read_excel(filepath, sheet_name='ACTIVATED LEADS ')
print(f"\nTotal activated leads: {len(df_activated)}")

# Check AMOUNT column to infer package
# 15Mbps typically costs less than 30Mbps
if 'AMOUNT' in df_activated.columns:
    df_activated['AMOUNT'] = pd.to_numeric(df_activated['AMOUNT'], errors='coerce')
    
    # Based on commission structure: 1498 for 15Mbps, 2248 for 30Mbps
    # Approximate thresholds
    amount_15mbps = df_activated[df_activated['AMOUNT'] < 1800]
    amount_30mbps = df_activated[df_activated['AMOUNT'] >= 1800]
    
    total_with_amount = len(amount_15mbps) + len(amount_30mbps)
    
    if total_with_amount > 0:
        print("\nINFERRED PACKAGE FROM AMOUNT:")
        print("-" * 80)
        print(f"15Mbps (Amount < 1800): {len(amount_15mbps)} ({(len(amount_15mbps)/total_with_amount)*100:.1f}%)")
        print(f"30Mbps (Amount >= 1800): {len(amount_30mbps)} ({(len(amount_30mbps)/total_with_amount)*100:.1f}%)")
        print(f"Total: {total_with_amount}")
        
        print(f"\nAverage amount for 15Mbps: KSh {amount_15mbps['AMOUNT'].mean():.2f}")
        print(f"Average amount for 30Mbps: KSh {amount_30mbps['AMOUNT'].mean():.2f}")

print("\n" + "=" * 80)
print("ANALYSIS COMPLETE")
print("=" * 80)
