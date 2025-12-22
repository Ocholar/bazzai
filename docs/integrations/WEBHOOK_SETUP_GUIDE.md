# WhatsApp Webhook Setup - Step by Step Guide

This guide will help you configure Meta WhatsApp to send messages to your n8n workflow automatically.

---

## Part 1: Get n8n Webhook URL

### Step 1: Open n8n Workflow
1. Go to your n8n instance (the URL where n8n is running)
2. Open the **"02_lead_qualification_agent"** workflow

### Step 2: Find the Webhook Node
1. Look for a node named **"Webhook - WhatsApp Response"** (it's the trigger node)
2. **Click on it** to open the configuration panel

### Step 3: Copy the Webhook URL
1. In the node configuration, look for **"Webhook URLs"** section
2. You'll see two URLs:
   - **Test URL** (starts with your n8n domain)
   - **Production URL** (same but for production)
3. **Copy the Production URL**
   - Example: `https://your-n8n.railway.app/webhook/abc123def456`
   - Or: `https://n8n.example.com/webhook-test/abc123def456`

> **IMPORTANT**: Make sure the workflow is **ACTIVE** (toggle switch at top should be ON/green)

---

## Part 2: Update Backend Environment Variables

### Step 4: Add n8n Webhook URL to .env

1. **Open** `c:\Antigravity\bazz-ai-backend\.env` in your text editor
2. **Add these lines** (or update if they exist):

```env
# WhatsApp Configuration
N8N_WHATSAPP_WEBHOOK_URL=YOUR_N8N_WEBHOOK_URL_HERE
WHATSAPP_VERIFY_TOKEN=bazz_whatsapp_verify_2024
WHATSAPP_APP_SECRET=your_facebook_app_secret_here
```

3. **Replace**:
   - `YOUR_N8N_WEBHOOK_URL_HERE` → Paste the n8n webhook URL you copied in Step 3
   - `your_facebook_app_secret_here` → Get from Meta (see Step 6 below)

4. **Example** of what it should look like:

```env
N8N_WHATSAPP_WEBHOOK_URL=https://n8n-production-abc.up.railway.app/webhook/a1b2c3d4e5f6
WHATSAPP_VERIFY_TOKEN=bazz_whatsapp_verify_2024
WHATSAPP_APP_SECRET=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
```

5. **Save** the `.env` file

### Step 5: Deploy Updated Backend

```bash
cd c:\Antigravity\bazz-ai-backend
git add .env
git commit -m "Add WhatsApp webhook configuration"
git push
```

> **Note**: If your backend is on Railway, wait 1-2 minutes for it to redeploy

---

## Part 3: Configure Meta for Developers

### Step 6: Get Facebook App Secret

1. Go to **https://developers.facebook.com/**
2. Click on **"My Apps"** (top right)
3. Select your **WhatsApp Business App**
4. In the left sidebar, click **"Settings"** → **"Basic"**
5. Find **"App Secret"**
6. Click **"Show"** and copy it
7. **Paste it** into your `.env` file (from Step 4) and redeploy

### Step 7: Configure WhatsApp Webhook

1. In Meta for Developers, go to your app
2. In the left sidebar, find **"WhatsApp"** → **"Configuration"**
3. Scroll down to **"Webhook"** section

### Step 8: Set Callback URL

1. Click **"Edit"** next to Callback URL
2. **Enter**:
   ```
   https://bazz-ai-agentic-team-production.up.railway.app/api/whatsapp/webhook
   ```
   
> **IMPORTANT**: This is your **BACKEND** URL (Railway), NOT the n8n URL!

3. **Enter Verify Token**:
   ```
   bazz_whatsapp_verify_2024
   ```
   (This must match `WHATSAPP_VERIFY_TOKEN` in your `.env`)

4. Click **"Verify and Save"**

**What happens**:
- Meta will send a GET request to your backend
- Your backend will verify the token
- If correct, Meta will save the webhook

**Expected Result**: ✅ Green checkmark or "Webhook verified successfully"

**If you get an error**:
- ❌ "Callback verification failed" → Token mismatch (check `.env`)
- ❌ "502 Bad Gateway" → Backend not running (check Railway deployment)
- ❌ "Connection timeout" → Wrong URL (check Railway app URL)

### Step 9: Subscribe to Webhook Fields

1. After webhook is verified, you'll see **"Webhook fields"** section
2. Find **"messages"** field
3. Click **"Subscribe"**
4. You should see a checkmark ✅ next to "messages"

**Other fields you can subscribe to (optional)**:
- `message_status` - To track delivery status
- `message_echoes` - To see outgoing messages

---

## Part 4: Test the Setup

### Step 10: Send Test Message via WhatsApp

1. Open **WhatsApp** on your phone
2. **Send a message** to your WhatsApp Business number:
   ```
   Yes, I'm interested
   ```

### Step 11: Verify Message Flow

**Check 1: Railway Backend Logs**
1. Go to **Railway.app** → Your project → **bazz-ai-backend**
2. Click **"Deployments"** → Latest deployment → **"View Logs"**
3. You should see:
   ```
   [WhatsApp Webhook] Received: {"from":"254720821051","text":"Yes, I'm interested",...}
   ```

**Check 2: n8n Workflow Execution**
1. Go to **n8n** → **Executions** tab (top right)
2. You should see a new execution (green = success)
3. Click it to see the flow

**Check 3: WhatsApp Reply**
1. Wait 3-5 seconds
2.You should receive an **AI reply** on WhatsApp!

---

## Part 5: Verification & Monitoring

### Step 12: Verify Database Updates

Run the verification script:

```bash
cd c:\Antigravity\bazz-ai-backend
node verify-whatsapp-data.js 254720821051
```

**Expected Output**:
```
✅ Lead Found!
👤 Customer: Test User
📱 Phone: 254720821051
📊 Status: contacted
💬 Conversation History (2 messages):
👤 [04:15:32] USER: Yes, I'm interested
🤖 [04:15:35] ASSISTANT: Great! We have two packages...
```

### Step 13: Monitor Real-Time

Open real-time monitor:

```bash
node monitor-whatsapp.js 254720821051 5
```

**This will show live updates** as you chat on WhatsApp!

---

## Troubleshooting Guide

### Issue: "Webhook verification failed"

**Cause**: Token mismatch

**Fix**:
1. Check `.env` file: `WHATSAPP_VERIFY_TOKEN=bazz_whatsapp_verify_2024`
2. Ensure backend is deployed (check Railway logs)
3. Try entering token in Meta again

---

### Issue: Messages not reaching n8n

**Cause**: `N8N_WHATSAPP_WEBHOOK_URL` not set or wrong

**Fix**:
1. Check `.env`: `N8N_WHATSAPP_WEBHOOK_URL=https://...`
2. Redeploy backend: `git push`
3. Check Railway logs for forwarding message to n8n

---

### Issue: AI not responding

**Cause**: n8n workflow not active or Gemini API issue

**Fix**:
1. Activate n8n workflow (toggle switch at top)
2. Check Gemini API key in n8n credentials
3. Check n8n execution logs for errors

---

### Issue: 404 on webhook

**Cause**: Wrong callback URL

**Fix**:
- **Correct URL**: `https://bazz-ai-agentic-team-production.up.railway.app/api/whatsapp/webhook`
- Should include `/api/whatsapp/webhook` path

---

## Summary Checklist

Before testing, ensure:

- [ ] n8n workflow is **ACTIVE**
- [ ] n8n webhook URL is copied
- [ ] `.env` has `N8N_WHATSAPP_WEBHOOK_URL` set
- [ ] `.env` has `WHATSAPP_VERIFY_TOKEN` set
- [ ] `.env` has `WHATSAPP_APP_SECRET` set
- [ ] Backend is deployed to Railway
- [ ] Meta webhook callback URL is set
- [ ] Meta webhook verify token matches `.env`
- [ ] Meta webhook is verified (green checkmark)
- [ ] "messages" field is subscribed

---

## Next: Full Conversation Test

Once setup is complete, test the full flow:

1. **Send**: "Yes, I'm interested"
   - **Expect**: AI asks for package choice
2. **Send**: "30Mbps package"
   - **Expect**: AI asks for location
3. **Send**: "Nairobi, Westlands"
   - **Expect**: AI asks for date
4. **Send**: "Tomorrow"
   - **Expect**: AI asks for time
5. **Send**: "Morning"
   - **Expect**: AI confirms and says you're qualified!

**Then verify**:
```bash
node verify-whatsapp-data.js 254720821051
```

You should see:
- Status: `qualified` ✅
- All fields filled ✅
- Full conversation history ✅

---

🎉 **Congratulations! Your WhatsApp AI agent is now live!**
