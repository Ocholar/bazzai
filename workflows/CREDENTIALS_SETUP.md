# n8n Credentials Setup - Quick Reference

## 🔑 WhatsApp Bearer Token

### Where to Get It:
1. Go to: https://developers.facebook.com/apps
2. Select your app
3. Click **WhatsApp** → **API Setup** (left sidebar)
4. **Temporary Access Token** - Copy this
5. **Phone Number ID** - Copy this from the "From" dropdown

### How to Create in n8n:
1. n8n → **Credentials** → **+ New Credential**
2. Search for: **Header Auth**
3. Fill in:
   - **Credential Name**: `WhatsApp Bearer Token`
   - **Header Name**: `Authorization`
   - **Header Value**: `Bearer PASTE_YOUR_ACCESS_TOKEN_HERE`
4. Click **Save**

---

## 🔑 MySQL Database

### You Already Have This!
Your existing credential:
- **Name**: `Railway MySQL (Real Leads)`
- **ID**: `ievvaCOuKbmrp02L`

If it shows encryption error, just **re-select it** from the dropdown in the node.

---

## 🌍 Environment Variables

Set these in your n8n instance (Settings → Variables):

```bash
WHATSAPP_PHONE_NUMBER_ID=paste_phone_id_from_meta
GOOGLE_GEMINI_API_KEY=your_gemini_api_key
DASHBOARD_API_URL=your_backend_api_url
```

**Get Gemini API Key**:
- Go to: https://aistudio.google.com/app/apikey
- Click **Create API Key**

---

## 📱 Node-by-Node Setup

### Node 1: Fetch New Leads from MySQL
- **Credential Type**: MySQL
- **Action**: Click dropdown → Select `Railway MySQL (Real Leads)`
- If error: Delete and re-create the credential with your Railway DB details

### Node 2: Send WhatsApp Message
- **Credential Type**: Header Auth
- **Action**: Select `WhatsApp Bearer Token` (created above)
- **URL must use**: `{{ $env.WHATSAPP_PHONE_NUMBER_ID }}`

---

## ⚡ Quick Troubleshooting

| Error | Fix |
|-------|-----|
| "Could not decrypt credentials" | Re-select the credential from dropdown |
| "Invalid phone number" | Ensure phone format is `254712345678` (no +) |
| "Invalid access token" | Regenerate token in Meta Developer Console |
| "Environment variable not found" | Add variable in n8n Settings → Variables |

---

## 🎯 Current Workflow Status

**Lead Qualification Agent**: Import the JSON, then configure only these 2 credentials:
1. MySQL on "Fetch New Leads from MySQL" node
2. Header Auth on "Send WhatsApp Message" node

**That's it!** Don't touch anything else.
