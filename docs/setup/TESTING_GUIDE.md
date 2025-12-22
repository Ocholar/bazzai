# WhatsApp Workflow Testing Guide

## Prerequisites

Before testing, ensure:

1. ✅ n8n workflow is active
2. ✅ Backend is deployed and running
3. ✅ Environment variables are set:
   - `N8N_WHATSAPP_WEBHOOK_URL`
   - `WHATSAPP_VERIFY_TOKEN`
   - `WHATSAPP_APP_SECRET`
4. ✅ Meta webhook is configured

## Setup

### 1. Get n8n Webhook URL

1. Open n8n workflow
2. Click "Webhook - WhatsApp Response" node
3. Copy the **Production URL** (e.g., `https://n8n.example.com/webhook/abc123`)

### 2. Configure Environment

Add to `.env`:
```env
N8N_WHATSAPP_WEBHOOK_URL=https://your-n8n-instance.com/webhook/YOUR_ID
WHATSAPP_VERIFY_TOKEN=my_secret_token_123
WHATSAPP_APP_SECRET=your_facebook_app_secret
```

### 3. Configure Meta Webhook

1. Go to **Meta for Developers** → Your App → **WhatsApp** → **Configuration**
2. **Callback URL**: 
   ```
   https://bazz-ai-agentic-team-production.up.railway.app/api/whatsapp/webhook
   ```
3. **Verify Token**: `my_secret_token_123` (same as in .env)
4. Click **Verify and Save**
5. Subscribe to **messages** webhook

---

## Testing Scripts

### Test Script 1: Simulate WhatsApp Messages

**Purpose**: Send test messages directly to n8n webhook

```bash
# Full qualification scenario
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/abc node test-whatsapp-flow.js fullQualification

# Rejection scenario
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/abc node test-whatsapp-flow.js rejection

# Partial info scenario
N8N_WEBHOOK_URL=https://your-n8n.com/webhook/abc node test-whatsapp-flow.js partialInfo
```

**Expected Output**:
```
🧪 Testing Scenario: fullQualification
📋 Step: Initial interest
📤 Sending: "Yes, tell me more"
✅ Response: 200 OK
⏳ Waiting 3s for AI response...
```

---

### Test Script 2: Verify Database Updates

**Purpose**: Check if conversation data is being saved

```bash
# Check specific lead
node verify-whatsapp-data.js 254720821051

# List all leads
node verify-whatsapp-data.js --all
```

**Expected Output**:
```
✅ Lead Found!

👤 Customer: Test User
📱 Phone: 254720821051
📊 Status: qualified
📦 Package: 30mbps
📍 Location: Nairobi, Westlands
📅 Date: 2025-12-05
🕐 Time: morning

💬 Conversation History (6 messages):
👤 [03:45:12] USER: Yes, tell me more
🤖 [03:45:15] ASSISTANT: Great! We have two packages...
```

---

### Test Script 3: Real-time Monitor

**Purpose**: Watch conversation progress live

```bash
# Monitor lead (refresh every 5 seconds)
node monitor-whatsapp.js 254720821051 5
```

**Expected Output**:
```
🔄 Monitoring lead: 254720821051
   Refresh interval: 5s

🔔 CHANGES DETECTED:
   • Package: none → 30mbps
   • New messages: 2
```

---

## Manual Testing via WhatsApp

### Full Conversation Flow

1. **Initial Message**: Reply with "Yes, tell me more"
   - **Expected AI Response**: Package options (15Mbps or 30Mbps)
   - **Verify**: Lead status = "contacted"

2. **Package Selection**: Reply "I want the 30Mbps package"
   - **Expected AI Response**: Ask for location
   - **Verify**: `preferredPackage` = "30mbps"

3. **Location**: Reply "Nairobi, Westlands area"
   - **Expected AI Response**: Ask for preferred date
   - **Verify**: `deliveryLocation` = "Nairobi, Westlands area"

4. **Date**: Reply "December 5th"
   - **Expected AI Response**: Ask for preferred time
   - **Verify**: `preferredDate` = "2025-12-05"

5. **Time**: Reply "Morning works for me"
   - **Expected AI Response**: Confirmation summary
   - **Verify**: `preferredTime` = "morning", `status` = "qualified"

---

## Verification Checklist

After each test, verify:

- [ ] Message appears in n8n execution log
- [ ] "Find Lead by Phone" returns lead data
- [ ] AI generates appropriate response
- [ ] Response is sent via WhatsApp
- [ ] Database is updated with new info
- [ ] Conversation history is saved correctly
- [ ] Lead status progresses (new → contacted → qualified)

---

## Troubleshooting

### Messages not reaching n8n

**Check**:
1. Meta webhook is configured correctly
2. `N8N_WHATSAPP_WEBHOOK_URL` is set in backend `.env`
3. Backend logs show: `[WhatsApp Webhook] Received: ...`

**Fix**: Check Railway logs for incoming webhook calls

---

### AI not responding

**Check**:
1. "Find Lead by Phone" node output
2. "Prepare AI Context" node output
3. Gemini API key is valid

**Fix**: Check n8n execution logs for errors

---

### Database not updating

**Check**:
1. "Update Lead Data" node execution
2. tRPC endpoint response (should be 200 OK)
3. Database connection

**Fix**: Run `node verify-whatsapp-data.js` to inspect current data

---

## Best Practices

1. **Test in sequence**: Don't skip steps in the conversation flow
2. **Wait for responses**: Give AI 2-3 seconds to respond before next message
3. **Monitor logs**: Keep Railway and n8n logs open during testing
4. **Clear test data**: Reset test lead to `status='new'` before each test
5. **Use verification script**: Run after each conversation to confirm data persistence

---

## Automated Test Suite

Run all tests in sequence:

```bash
# 1. Full qualification
N8N_WEBHOOK_URL=https://... node test-whatsapp-flow.js fullQualification

# 2. Wait 10s
sleep 10

# 3. Verify qualification
node verify-whatsapp-data.js 254720821051

# Expected: status = "qualified", all fields filled
```

---

## Next Steps

After successful testing:

1. ✅ Configure production WhatsApp number
2. ✅ Update message templates if needed
3. ✅ Set up error monitoring (Sentry, etc.)
4. ✅ Create backup/restore procedures
5. ✅ Train customer support on the system
