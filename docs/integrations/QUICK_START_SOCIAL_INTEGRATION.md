# 🚀 Quick Start Guide - Social Media Integration

## ✅ **Step-by-Step Checklist**

### **Phase 1: Get WhatsApp Business API Credentials** (30 minutes)

1. **Go to Meta Business Suite**
   - URL: https://business.facebook.com/
   - Click: Business Settings → Accounts → WhatsApp Accounts → Add

2. **Create WhatsApp Business Account**
   - Business Name: `Bazztech Networks`
   - Get a NEW phone number (not +254 781 751 937)
   - Verify the number via SMS

3. **Create Meta App**
   - URL: https://developers.facebook.com/apps/
   - Click "Create App" → Business → Name: `Bazztech WhatsApp Integration`
   - Add WhatsApp Product

4. **Copy These Credentials**
   ```
   WHATSAPP_BUSINESS_ACCOUNT_ID: _________________
   WHATSAPP_PHONE_NUMBER_ID: _________________
   WHATSAPP_ACCESS_TOKEN: _________________
   ```

---

### **Phase 2: Get Facebook/Instagram Credentials** (15 minutes)

1. **Go to Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer/
   - Select your app: `Bazztech WhatsApp Integration`

2. **Get Page Access Token**
   - Click "Get Token" → "Get Page Access Token"
   - Select page: **Bazztech Networks**
   - Grant permissions (check ALL boxes)

3. **Copy These Credentials**
   ```
   FACEBOOK_PAGE_ID: _________________
   FACEBOOK_PAGE_ACCESS_TOKEN: _________________
   INSTAGRAM_BUSINESS_ACCOUNT_ID: _________________
   ```

---

### **Phase 3: Update n8n Environment Variables** (5 minutes)

1. **Access your n8n instance**
   - If cloud: Settings → Environment
   - If self-hosted: Edit `.env` file

2. **Add ALL these variables**
   ```bash
   # Existing (keep these)
   DASHBOARD_API_URL=https://bazz-ai-agentic-team-production.up.railway.app/api/trpc
   MANUS_LLM_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
   MANUS_LLM_API_URL=https://api.manus.im

   # NEW - WhatsApp
   WHATSAPP_BUSINESS_ACCOUNT_ID=paste_here
   WHATSAPP_PHONE_NUMBER_ID=paste_here
   WHATSAPP_ACCESS_TOKEN=paste_here
   WHATSAPP_VERIFY_TOKEN=bazztech_webhook_2025

   # NEW - Facebook/Instagram
   FACEBOOK_PAGE_ID=paste_here
   FACEBOOK_PAGE_ACCESS_TOKEN=paste_here
   FACEBOOK_APP_ID=paste_here
   FACEBOOK_APP_SECRET=paste_here
   INSTAGRAM_BUSINESS_ACCOUNT_ID=paste_here
   ```

3. **Restart n8n** (if self-hosted)

---

### **Phase 4: Import n8n Workflows** (5 minutes)

1. **Open n8n**
   - Click "Workflows" → "Import from File"

2. **Import these files** (from `bazz-ai-backend/n8n_workflows/`)
   - ✅ `05_whatsapp_auto_responder.json`
   - ✅ `06_social_media_auto_poster.json`

3. **Activate workflows**
   - Open each workflow
   - Click "Active" toggle (top right)

---

### **Phase 5: Configure Webhook** (10 minutes)

1. **Get your n8n webhook URL**
   - Open workflow: `05_whatsapp_auto_responder`
   - Click on "WhatsApp Webhook" node
   - Copy the "Production URL" (e.g., `https://your-n8n.com/webhook/whatsapp`)

2. **Set up WhatsApp Webhook**
   - Go to: https://developers.facebook.com/apps/
   - Select your app → WhatsApp → Configuration
   - Callback URL: `paste_your_n8n_webhook_url`
   - Verify Token: `bazztech_webhook_2025`
   - Click "Verify and Save"

3. **Subscribe to events**
   - Check: `messages`
   - Check: `message_status`

---

### **Phase 6: Test Everything** (10 minutes)

#### **Test 1: WhatsApp Auto-Responder**
1. Send a WhatsApp message to your business number
2. Expected: Receive auto-reply within 5 seconds
3. Check: Lead created in dashboard

#### **Test 2: Social Media Posting**
1. In n8n, open `06_social_media_auto_poster`
2. Click "Execute Workflow" (manually trigger)
3. Expected: Post appears on Facebook page
4. Expected: Post appears on Instagram (if image topic)

#### **Test 3: End-to-End**
1. Comment "interested" on a Facebook post
2. Expected: Auto-reply with link
3. Expected: Lead captured in dashboard

---

## 🎯 **Success Criteria**

- ✅ WhatsApp messages get auto-replied
- ✅ New leads appear in dashboard
- ✅ Facebook posts every 6 hours
- ✅ Instagram posts with images
- ✅ All credentials working

---

## 🆘 **Troubleshooting**

### **"Webhook verification failed"**
- Check verify token matches exactly: `bazztech_webhook_2025`
- Ensure n8n URL is publicly accessible
- Try using ngrok if testing locally

### **"Invalid access token"**
- Token expired → Generate new one
- Wrong permissions → Re-authorize with ALL permissions

### **"No posts appearing"**
- Check workflow is ACTIVE
- Check environment variables are set
- Check API credentials are correct

---

## 📞 **Need Help?**

Refer to the full guide: `SOCIAL_MEDIA_INTEGRATION_GUIDE.md`

---

**Created**: 2025-11-30  
**Status**: Ready to Execute
