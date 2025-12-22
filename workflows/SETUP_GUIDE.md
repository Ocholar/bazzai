# n8n Workflows Setup Guide - BAZZ AI Agentic Team

## 🎯 Quick Start

This guide will help you set up the automated lead qualification workflow in n8n.

---

## ✅ Prerequisites

Before you begin, make sure you have:

1. **n8n instance** running (cloud or self-hosted)
2. **Backend API** deployed on Railway: `https://bazz-ai-agentic-team-production.up.railway.app`
3. **Dashboard** accessible at: `https://bazztech.co.ke`
4. **Leads in database** (you already have 33 leads!)

---

## 📋 Step 1: Access Your n8n Instance

1. Open your n8n dashboard
2. Go to **Workflows** in the sidebar
3. Click **"+ Add Workflow"** or **"Import from File"**

---

## 📥 Step 2: Import the Workflows

You have three tiers of workflows. Choose the one that fits your ambition:

### Tier 1: Fixed (Simple & Reliable)
- `02_lead_qualification_agent_FIXED.json`
- `03_form_submission_agent_FIXED.json`
- `04_weekly_optimization_agent_FIXED.json`

### Tier 2: AI-Powered (Conversational)
- `02_lead_qualification_agent_AI_POWERED.json` (Uses AI for WhatsApp)

### Tier 3: Autonomous (Self-Correcting) 🚀
- `02_lead_qualification_agent_DYNAMIC.json` (Reads prompt from DB)
- `04_weekly_optimization_agent_AUTONOMOUS.json` (Updates DB automatically)

---

## 🧠 How the Autonomous System Works

1. **Dynamic Qualification**: The `DYNAMIC` agent doesn't have a hardcoded prompt. It fetches its personality from your database (`qualification_system_prompt`).
2. **Self-Correction**: The `AUTONOMOUS` optimization agent checks your conversion rate every week.
3. **Auto-Update**: If conversion is < 20%, it asks GPT-4o to rewrite the sales prompt to be better, then **updates the database**.
4. **Result**: The next time the Qualification Agent runs, it uses the **new, optimized prompt**.

**To use Tier 3:**
1. Import `02_lead_qualification_agent_DYNAMIC.json`.
2. Import `04_weekly_optimization_agent_AUTONOMOUS.json`.
3. Ensure you have `MANUS_LLM_API_KEY` set.

---

## 🔧 Step 3: Understanding the Workflows

### Lead Qualification Agent (DYNAMIC)
1. **Fetch Config**: Gets current prompt from DB.
2. **Fetch Leads**: Gets new leads.
3. **Generate & Send**: Uses the dynamic prompt to message leads.

### Weekly Optimization Agent (AUTONOMOUS)
1. **Fetch Analytics**: Checks performance.
2. **Analyze**: "Is conversion < 20%?"
3. **Rewrite**: If yes, AI generates a new strategy.
4. **Update Config**: Saves new strategy to DB.
5. **Notify**: Tells you what it changed.

---

## ⚙️ Step 4: Configuration

### Form Submission Agent
**IMPORTANT**: You must update the Form ID.
1. Open the **"Submit to Microsoft Forms"** node.
2. In the URL field, replace `[FORM_ID]` with your actual form ID.

All other workflows are **pre-configured** with:
- ✅ Correct API endpoint: `https://bazz-ai-agentic-team-production.up.railway.app`
- ✅ Correct tRPC format
- ✅ Public notification system

---

## 🧪 Step 5: Test the Workflows

### 1. Test Qualification
1. Ensure you have 'new' leads.
2. Execute **Lead Qualification Agent**.
3. Verify it sends a message (check logs).

### 2. Test Autonomous Optimization
1. Execute **Weekly Optimization Agent (AUTONOMOUS)**.
2. If your conversion rate is 0% (which it likely is for testing), it should trigger a **Rewrite**.
3. Check the "Notify Update" node output to see the new prompt it created.

---

## 🚀 Step 6: Activate Workflows

Once testing is successful:

1. Click the **"Active"** toggle switch for each workflow.
2. They will run on their defined schedules.

---

## 📊 Step 7: Monitor Performance

### Check Dashboard:
1. Go to `https://bazztech.co.ke/#/dashboard`
2. Monitor **"Qualified Leads"** and **"Total Activations"**.

### Check Backend Logs:
1. Go to Railway Dashboard.
2. View logs for `bazz-ai-agentic-team`.

---

## 🐛 Troubleshooting

### Issue: "Config not found"
**Solution**:
- The Dynamic agent handles missing config by using a default fallback prompt.
- You can manually set the initial prompt using the API or just let the Optimization agent create one.

### Issue: "WhatsApp message failed"
**Solution**:
- Check `WHATSAPP_PHONE_NUMBER_ID` and `WHATSAPP_ACCESS_TOKEN`.
- Ensure you are using a Template Message if outside the 24h window.

---

## 📈 Performance Targets

| Metric | Target | Frequency |
|--------|--------|-----------|
| Leads Contacted | 50+/day | Every 2 hours |
| Forms Submitted | 100% of qualified | Every 4 hours |
| Weekly Profit | KES 40k+ | Weekly |

---

## 🔐 Security Notes

- ✅ No API keys required for internal endpoints.
- ✅ CORS configured for `https://bazztech.co.ke`.
- ✅ tRPC handles request validation.

---

**Last Updated**: November 30, 2025
**Version**: 3.0 (AUTONOMOUS)
**Status**: Ready for Production ✅
