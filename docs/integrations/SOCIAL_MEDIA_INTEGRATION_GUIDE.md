# 🚀 Bazztech Networks - Social Media Integration Guide

**Complete setup for WhatsApp Business API, Facebook Graph API, and Social Automation**

---

## 📋 **Table of Contents**

1. [WhatsApp Business API Setup](#1-whatsapp-business-api-setup)
2. [Facebook Graph API Configuration](#2-facebook-graph-api-configuration)
3. [n8n Integration](#3-n8n-integration)
4. [Social Media Automation](#4-social-media-automation)
5. [Environment Variables](#5-environment-variables)

---

## 1. WhatsApp Business API Setup

### **Prerequisites**
- ✅ Facebook Business Account (Verified) - **DONE**
- ✅ Meta Business Suite Access - **DONE**
- 📱 New phone number (not your current +254 781 751 937)
- 💳 Payment method for WhatsApp Business API

### **Step 1: Create WhatsApp Business Account**

1. **Go to Meta Business Suite**
   - URL: https://business.facebook.com/
   - Navigate to: **Business Settings** → **Accounts** → **WhatsApp Accounts**

2. **Add WhatsApp Business Account**
   - Click "Add" → "Create a WhatsApp Business Account"
   - Business Name: `Bazztech Networks`
   - Business Category: `Telecommunications`
   - Time Zone: `Africa/Nairobi`

3. **Add Phone Number**
   - Click "Add Phone Number"
   - **IMPORTANT**: Use a NEW number (not +254 781 751 937)
   - Recommended: Get a new Safaricom/Airtel number for business use
   - Verify via SMS code

### **Step 2: Get WhatsApp API Credentials**

1. **Create a Meta App**
   - Go to: https://developers.facebook.com/apps/
   - Click "Create App"
   - Use Case: **Business**
   - App Type: **Business**
   - App Name: `Bazztech WhatsApp Integration`

2. **Add WhatsApp Product**
   - In your app dashboard, click "Add Product"
   - Select **WhatsApp** → "Set Up"

3. **Get Credentials**
   ```
   You'll need these values:
   
   - WHATSAPP_BUSINESS_ACCOUNT_ID: [From WhatsApp → API Setup]
   - WHATSAPP_PHONE_NUMBER_ID: [From WhatsApp → API Setup]
   - WHATSAPP_ACCESS_TOKEN: [From WhatsApp → API Setup → Temporary Token]
   - WHATSAPP_VERIFY_TOKEN: [Create your own, e.g., "bazztech_webhook_2025"]
   ```

4. **Generate Permanent Access Token**
   - Go to: **App Settings** → **Basic**
   - Copy `App ID` and `App Secret`
   - Use Graph API Explorer to generate permanent token:
     - URL: https://developers.facebook.com/tools/explorer/
     - Select your app
     - Get Token → Get User Access Token
     - Permissions needed:
       - `whatsapp_business_management`
       - `whatsapp_business_messaging`
     - Click "Generate Access Token"
     - Exchange for permanent token using this command:

   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/oauth/access_token?grant_type=fb_exchange_token&client_id=YOUR_APP_ID&client_secret=YOUR_APP_SECRET&fb_exchange_token=YOUR_SHORT_LIVED_TOKEN"
   ```

### **Step 3: Configure Webhook**

1. **Set Webhook URL**
   - In WhatsApp → Configuration
   - Callback URL: `https://YOUR_N8N_URL/webhook/whatsapp`
   - Verify Token: `bazztech_webhook_2025` (or whatever you chose)

2. **Subscribe to Events**
   - Select: `messages`
   - Select: `message_status`

---

## 2. Facebook Graph API Configuration

### **Step 1: Get Facebook Page Access Token**

1. **Go to Graph API Explorer**
   - URL: https://developers.facebook.com/tools/explorer/

2. **Select Your App**
   - Choose: `Bazztech WhatsApp Integration` (or create new)

3. **Get Page Access Token**
   - Click "Get Token" → "Get Page Access Token"
   - Select your Facebook Page: **Bazztech Networks**
   - Permissions needed:
     - `pages_show_list`
     - `pages_read_engagement`
     - `pages_manage_posts`
     - `pages_manage_engagement`
     - `instagram_basic`
     - `instagram_content_publish`
     - `business_management`

4. **Generate Permanent Page Token**
   ```bash
   # Step 1: Get User Token (from Graph Explorer)
   USER_TOKEN="YOUR_USER_TOKEN"
   
   # Step 2: Get Page ID
   curl -X GET "https://graph.facebook.com/v18.0/me/accounts?access_token=$USER_TOKEN"
   
   # Copy the PAGE_ID and PAGE_ACCESS_TOKEN from response
   ```

### **Step 2: Instagram Integration**

1. **Connect Instagram to Facebook Page**
   - Go to Facebook Page Settings
   - Instagram → Connect Account
   - Login to Instagram Business Account

2. **Get Instagram Business Account ID**
   ```bash
   curl -X GET "https://graph.facebook.com/v18.0/PAGE_ID?fields=instagram_business_account&access_token=PAGE_ACCESS_TOKEN"
   ```

### **Step 3: LinkedIn Integration (Optional)**

1. **Create LinkedIn App**
   - URL: https://www.linkedin.com/developers/apps
   - App Name: `Bazztech Social Automation`
   - Company: `Bazztech Networks`

2. **Get Credentials**
   - Copy `Client ID` and `Client Secret`
   - Add Redirect URL: `https://YOUR_N8N_URL/webhook/linkedin`

3. **Request Permissions**
   - `w_member_social` (post on behalf)
   - `r_liteprofile` (read profile)

---

## 3. n8n Integration

### **Step 1: Update n8n Environment Variables**

Add these to your n8n instance:

```bash
# Existing
DASHBOARD_API_URL=https://bazz-ai-agentic-team-production.up.railway.app/api/trpc
MANUS_LLM_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
MANUS_LLM_API_URL=https://api.manus.im

# NEW - WhatsApp Business API
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_permanent_access_token
WHATSAPP_VERIFY_TOKEN=bazztech_webhook_2025

# NEW - Facebook Graph API
FACEBOOK_PAGE_ID=your_page_id
FACEBOOK_PAGE_ACCESS_TOKEN=your_page_access_token
FACEBOOK_APP_ID=your_app_id
FACEBOOK_APP_SECRET=your_app_secret

# NEW - Instagram
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_instagram_id

# NEW - LinkedIn (Optional)
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
LINKEDIN_ACCESS_TOKEN=your_linkedin_token
```

### **Step 2: Import New Workflows**

I'll create these workflows for you:

1. **WhatsApp Auto-Responder** - Responds to incoming messages
2. **Social Media Poster** - Posts to Facebook, Instagram, LinkedIn
3. **Lead Capture from Social** - Captures leads from comments/DMs
4. **WhatsApp Broadcast** - Send bulk messages to customers

---

## 4. Social Media Automation

### **Workflow 1: WhatsApp Auto-Responder**

**Trigger**: Incoming WhatsApp message
**Actions**:
1. Check if message is from known customer (database lookup)
2. If new → Send welcome message + capture lead
3. If existing → Route to appropriate response
4. Log conversation to dashboard

### **Workflow 2: Automated Social Posting**

**Trigger**: Schedule (daily at 9 AM, 2 PM, 6 PM)
**Actions**:
1. Generate post content using AI (Manus LLM)
2. Post to Facebook Page
3. Post to Instagram (if image)
4. Post to LinkedIn Company Page
5. Log engagement metrics

**Sample Post Topics**:
- 5G speed test results
- Customer testimonials
- Network coverage updates
- Special offers
- Tech tips

### **Workflow 3: Lead Capture from Social**

**Trigger**: New comment on Facebook/Instagram post
**Actions**:
1. Check if comment contains keywords: "interested", "price", "coverage", "contact"
2. Extract phone number if provided
3. Send auto-reply with link to contact form
4. Create lead in dashboard
5. Send WhatsApp follow-up (if number provided)

### **Workflow 4: WhatsApp Broadcast**

**Trigger**: Manual or scheduled
**Actions**:
1. Fetch customer list from dashboard (filtered by status)
2. Personalize message template
3. Send bulk WhatsApp messages (respecting rate limits)
4. Track delivery status
5. Update dashboard with campaign results

---

## 5. Environment Variables

### **Complete .env File for n8n**

Create a file called `.env` in your n8n directory:

```bash
# ============================================
# BAZZTECH NETWORKS - n8n CONFIGURATION
# ============================================

# Dashboard API
DASHBOARD_API_URL=https://bazz-ai-agentic-team-production.up.railway.app/api/trpc

# AI/LLM
MANUS_LLM_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
MANUS_LLM_API_URL=https://api.manus.im

# WhatsApp Business API
WHATSAPP_BUSINESS_ACCOUNT_ID=
WHATSAPP_PHONE_NUMBER_ID=
WHATSAPP_ACCESS_TOKEN=
WHATSAPP_VERIFY_TOKEN=bazztech_webhook_2025

# Facebook Graph API
FACEBOOK_PAGE_ID=
FACEBOOK_PAGE_ACCESS_TOKEN=
FACEBOOK_APP_ID=
FACEBOOK_APP_SECRET=

# Instagram
INSTAGRAM_BUSINESS_ACCOUNT_ID=

# LinkedIn (Optional)
LINKEDIN_CLIENT_ID=
LINKEDIN_CLIENT_SECRET=
LINKEDIN_ACCESS_TOKEN=

# Webhook URLs (update with your n8n URL)
N8N_WEBHOOK_BASE_URL=https://your-n8n-instance.com
```

---

## 📝 **Next Steps**

### **Immediate Actions**:

1. ✅ **Get New Phone Number** for WhatsApp Business API
2. ✅ **Create Meta App** and get WhatsApp credentials
3. ✅ **Generate Permanent Tokens** for Facebook/Instagram
4. ✅ **Update n8n Environment Variables**
5. ✅ **Import New Workflows** (I'll create these)

### **Testing Checklist**:

- [ ] Send test WhatsApp message → Receive auto-reply
- [ ] Post to Facebook → Verify it appears
- [ ] Post to Instagram → Verify it appears
- [ ] Comment on post → Verify lead capture
- [ ] Send WhatsApp broadcast → Verify delivery

---

## 🆘 **Support & Troubleshooting**

### **Common Issues**:

1. **"Invalid Access Token"**
   - Token expired → Generate new permanent token
   - Wrong permissions → Re-authorize with correct scopes

2. **"Webhook Verification Failed"**
   - Check verify token matches exactly
   - Ensure n8n webhook URL is accessible publicly

3. **"Rate Limit Exceeded"**
   - WhatsApp: Max 1000 messages/day (free tier)
   - Facebook: Max 200 API calls/hour/user
   - Solution: Add delays in workflows

### **Useful Links**:

- WhatsApp Business API Docs: https://developers.facebook.com/docs/whatsapp
- Graph API Explorer: https://developers.facebook.com/tools/explorer/
- n8n Documentation: https://docs.n8n.io/
- Meta Business Suite: https://business.facebook.com/

---

## 🎯 **Success Metrics**

Track these KPIs after implementation:

- **WhatsApp Response Rate**: Target 90%+ within 5 minutes
- **Social Engagement**: Target 5%+ engagement rate
- **Lead Conversion**: Target 20%+ from social to contact form
- **Automation Coverage**: Target 80%+ of routine inquiries automated

---

**Created**: 2025-11-30  
**Version**: 1.0  
**Status**: Ready for Implementation
