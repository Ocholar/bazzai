# WhatsApp Send Message - Quick Reference Card

## 🔑 Credentials Setup (2 minutes)

### In n8n:
1. **Create Credential**: Credentials → New → Header Auth
2. **Configure**:
   - Name: `WhatsApp Bearer Token`
   - Header Name: `Authorization`
   - Header Value: `Bearer YOUR_TOKEN_FROM_META`

### Get Token from Meta:
1. https://developers.facebook.com/apps
2. Your App → WhatsApp → API Setup
3. Copy **Temporary Access Token**
4. Copy **Phone Number ID** (from "From" dropdown)

---

## 📱 Send Message Node Setup

### HTTP Request Node Configuration:

```
Method: POST
URL: https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages
Authentication: Header Auth → WhatsApp Bearer Token
```

### Headers:
```json
{
  "Content-Type": "application/json"
}
```

### Body (JSON):
```json
{
  "messaging_product": "whatsapp",
  "to": "254712345678",
  "type": "text",
  "text": {
    "body": "Your message here"
  }
}
```

---

## 💡 Using Workflow Data

### Code Node (Before HTTP Request):
```javascript
// Clean phone number
const phone = $input.item.json.phone.replace(/[\s+\-()]/g, '');

// Build message
const payload = {
  messaging_product: "whatsapp",
  to: phone,
  type: "text",
  text: {
    body: `Hi ${$input.item.json.customerName}!\n\nYour message here.`
  }
};

return {
  whatsapp_payload: payload,
  phoneNumberId: "YOUR_PHONE_NUMBER_ID"
};
```

### HTTP Request Body:
```
{{ JSON.stringify($json.whatsapp_payload) }}
```

---

## 🐛 Common Errors - Quick Fixes

| Error | Fix |
|-------|-----|
| **Invalid phone number** | Remove `+`, use format: `254712345678` |
| **Invalid JSON** | Use `JSON.stringify($json.payload)` |
| **Could not connect** | Check token: `Bearer YOUR_TOKEN` (with space) |
| **Unsupported post request** | Verify Phone Number ID |
| **Recipient not registered** | Add test number in Meta dashboard |

---

## ✅ Quick Test

**Test URL in browser** (replace values):
```
https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages
```

**Test with curl**:
```bash
curl -X POST \
  'https://graph.facebook.com/v18.0/PHONE_ID/messages' \
  -H 'Authorization: Bearer TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"messaging_product":"whatsapp","to":"254712345678","type":"text","text":{"body":"Test"}}'
```

---

## 📋 Your Current Workflow

You already have `Send WhatsApp Message` node at line 194-217 in:
`05_whatsapp_auto_responder.json`

**Just needs**:
1. Valid credential with Meta access token
2. Correct Phone Number ID in URL
3. Clean phone numbers (no `+`)

---

## 🚀 Production Checklist

- [ ] Get **System User Token** (permanent)
- [ ] Set App to **Live Mode**
- [ ] Complete **Business Verification**
- [ ] Create & approve **Message Templates**

---

**Full Guide**: See `WHATSAPP_SETUP_GUIDE.md` for detailed instructions.
