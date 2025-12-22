import pandas as pd
import os

# File path
data_dir = r'c:\Users\Administrator\Documents\Antigravity\bazz-ai-backend\data'
filename = "ENTERPRISE ODU SALES TRACKER 2025 -- NOV'26.xlsx"
filepath = os.path.join(data_dir, filename)

# Read the ACTIVATED LEADS sheet
df_activated = pd.read_excel(filepath, sheet_name='ACTIVATED LEADS ')

print("=" * 80)
print("HIGHEST EARNING ANALYSIS - SEPT, OCT, NOV 2025")
print("=" * 80)

# Clean up the data
df_activated['DATE'] = pd.to_datetime(df_activated['DATE'], errors='coerce')
df_activated['AMOUNT'] = pd.to_numeric(df_activated['AMOUNT'], errors='coerce')

# Extract month
df_activated['Month'] = df_activated['DATE'].dt.month
df_activated['Month_Name'] = df_activated['DATE'].dt.strftime('%B')

# Commission rates based on tier
def calculate_commission(activations, avg_amount):
    total_revenue = activations * avg_amount
    
    if activations < 100:
        commission_rate = 0.50
        bonus = 0
    elif activations < 200:
        commission_rate = 0.55
        bonus = 0
    elif activations < 300:
        commission_rate = 0.60
        bonus = 0
    elif activations < 400:
        commission_rate = 0.65
        bonus = 66000 / 3  # Quarterly bonus divided by 3 months
    else:
        commission_rate = 0.70
        bonus = 132000 / 3
    
    base_commission = total_revenue * commission_rate
    total_earnings = base_commission + bonus
    
    return {
        'commission_rate': commission_rate * 100,
        'base_commission': base_commission,
        'bonus': bonus,
        'total_earnings': total_earnings
    }

# Analyze by month and agent
for month in [9, 10, 11]:  # Sept, Oct, Nov
    month_data = df_activated[df_activated['Month'] == month]
    
    if len(month_data) == 0:
        continue
    
    month_name = month_data['Month_Name'].iloc[0]
    
    print(f"\n{'='*80}")
    print(f"MONTH: {month_name.upper()} 2025")
    print(f"{'='*80}")
    
    # Group by Agent Name
    agent_summary = month_data.groupby('Agent Name').agg({
        'MSIDN': 'count',  # Number of activations
        'AMOUNT': 'sum'     # Total amount
    }).reset_index()
    
    agent_summary.columns = ['Agent Name', 'Activations', 'Total Amount']
    agent_summary['Avg Amount'] = agent_summary['Total Amount'] / agent_summary['Activations']
    
    # Calculate earnings for each agent
    earnings_list = []
    for _, row in agent_summary.iterrows():
        earnings = calculate_commission(row['Activations'], row['Avg Amount'])
        earnings_list.append({
            'Agent Name': row['Agent Name'],
            'Activations': row['Activations'],
            'Total Amount': row['Total Amount'],
            'Commission Rate': earnings['commission_rate'],
            'Base Commission': earnings['base_commission'],
            'Bonus': earnings['bonus'],
            'Total Earnings': earnings['total_earnings']
        })
    
    earnings_df = pd.DataFrame(earnings_list)
    earnings_df = earnings_df.sort_values('Total Earnings', ascending=False)
    
    # Show top 10
    print(f"\nTOP 10 EARNERS:")
    print("-" * 80)
    for idx, row in earnings_df.head(10).iterrows():
        print(f"\n{idx+1}. {row['Agent Name']}")
        print(f"   Activations: {int(row['Activations'])}")
        print(f"   Total Amount: KSh {row['Total Amount']:,.2f}")
        print(f"   Commission Rate: {row['Commission Rate']:.0f}%")
        print(f"   Base Commission: KSh {row['Base Commission']:,.2f}")
        if row['Bonus'] > 0:
            print(f"   Quarterly Bonus: KSh {row['Bonus']:,.2f}")
        print(f"   >>> TOTAL EARNINGS: KSh {row['Total Earnings']:,.2f} <<<")
    
    # Overall month stats
    total_activations = agent_summary['Activations'].sum()
    total_amount = agent_summary['Total Amount'].sum()
    
    print(f"\n{'-'*80}")
    print(f"MONTH TOTALS:")
    print(f"  Total Activations: {int(total_activations)}")
    print(f"  Total Amount: KSh {total_amount:,.2f}")
    print(f"  Average per Activation: KSh {total_amount/total_activations:,.2f}")
    print(f"  Number of Agents: {len(agent_summary)}")

print("\n" + "=" * 80)
print("ANALYSIS COMPLETE")
print("=" * 80)
