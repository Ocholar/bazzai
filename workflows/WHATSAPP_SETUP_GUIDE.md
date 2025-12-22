# WhatsApp Send Message Node - Complete Setup Guide

This guide will help you configure WhatsApp in n8n with proper credentials, message content, and error debugging.

---

## 1. Setting Up WhatsApp Credentials

### Step 1: Get Meta Access Token

1. **Go to Meta for Developers**
   - Visit: https://developers.facebook.com/
   - Log in with your Facebook account

2. **Navigate to Your App**
   - Go to: [My Apps](https://developers.facebook.com/apps)
   - Select your app (or create a new one if needed)

3. **Add WhatsApp Product**
   - In the left sidebar, click **"Add Product"**
   - Find **"WhatsApp"** and click **"Set Up"**

4. **Get Access Token**
   - Go to: **WhatsApp → API Setup**
   - Copy your **Temporary Access Token** (valid for 24 hours)
   - **IMPORTANT**: For production, create a **Permanent Access Token**

5. **Get Phone Number ID**
   - On the same page, find **"From"** dropdown
   - Copy the **Phone Number ID** (looks like: `123456789012345`)

### Step 2: Create Credentials in n8n

1. **Create HTTP Header Auth Credential**
   - In n8n, go to **Credentials → New**
   - Select **"Header Auth"**
   - Set:
     - **Name**: `WhatsApp Bearer Token` (or any name)
     - **Header Name**: `Authorization`
     - **Header Value**: `Bearer YOUR_ACCESS_TOKEN_HERE`
   - Click **Save**

> **Example:**
> ```
> Header Name: Authorization
> Header Value: Bearer EAAVBv...your_token_here
> ```

### Step 3: Create Permanent Access Token (Production)

For production use, you need a System User Token:

1. Go to **Meta Business Suite**: https://business.facebook.com/
2. Navigate to **Business Settings → Users → System Users**
3. Click **"Add"** to create a new System User
4. Assign the WhatsApp app to the System User
5. Generate token with these permissions:
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
6. **IMPORTANT**: Save this token securely (it won't be shown again)

---

## 2. Configuring the Send Message Node

### Basic Setup

1. **Add HTTP Request Node**
   - In your workflow, add an **HTTP Request** node
   - Name it: `Send WhatsApp Message`

2. **Configure Request**

   ```
   Method: POST
   URL: https://graph.facebook.com/v18.0/{{PHONE_NUMBER_ID}}/messages
   ```

   Replace `{{PHONE_NUMBER_ID}}` with your actual Phone Number ID.

3. **Authentication**
   - Select: **Predefined Credential Type**
   - Choose: **Header Auth**
   - Select your saved credential: **WhatsApp Bearer Token**

4. **Headers**
   - Add header:
     ```
     Content-Type: application/json
     ```

5. **Body Configuration**
   - Body Content Type: **JSON**
   - Body: (see message examples below)

### Message Content from Workflow Data

#### A. Simple Text Message

```json
{
  "messaging_product": "whatsapp",
  "to": "{{ $json.recipientPhone }}",
  "type": "text",
  "text": {
    "body": "{{ $json.messageText }}"
  }
}
```

**From your workflow data:**
- `$json.recipientPhone` → Phone number from previous node
- `$json.messageText` → Message content from previous node

#### B. Template Message

```json
{
  "messaging_product": "whatsapp",
  "to": "{{ $json.recipientPhone }}",
  "type": "template",
  "template": {
    "name": "hello_world",
    "language": {
      "code": "en_US"
    }
  }
}
```

#### C. Interactive List Message (from your workflow)

```json
{
  "messaging_product": "whatsapp",
  "to": "{{ $json.from }}",
  "type": "interactive",
  "interactive": {
    "type": "list",
    "header": {
      "type": "text",
      "text": "Welcome to Bazztech Networks 🚀"
    },
    "body": {
      "text": "We provide ultra-fast 5G and Fiber internet. How can we help you today?"
    },
    "footer": {
      "text": "Select an option below"
    },
    "action": {
      "button": "Main Menu",
      "sections": [
        {
          "title": "Our Services",
          "rows": [
            {
              "id": "packages",
              "title": "View Packages",
              "description": "Check internet plans & pricing"
            },
            {
              "id": "coverage",
              "title": "Check Coverage",
              "description": "See if we are in your area"
            }
          ]
        }
      ]
    }
  }
}
```

#### D. Using Code Node to Build Dynamic Payload

Here's how to use a **Code** node before the HTTP Request:

```javascript
// Extract data from previous node
const recipientPhone = $input.item.json.phone;
const customerName = $input.item.json.customerName;
const packageName = $input.item.json.preferredPackage;

// Build WhatsApp payload
const payload = {
  messaging_product: "whatsapp",
  to: recipientPhone,
  type: "text",
  text: {
    body: `Hi ${customerName}! 👋\n\nThank you for your interest in our ${packageName} package.\n\nOur team will contact you shortly!\n\nBazztech Networks`
  }
};

return {
  whatsapp_payload: payload,
  recipientPhone: recipientPhone
};
```

Then in the HTTP Request node:
```json
{{ $json.whatsapp_payload }}
```

---

## 3. Common Errors & Debugging

### Error 1: "Invalid recipient phone number"

**Problem**: Phone number format is incorrect.

**Solution**:
- Phone must be in international format **without +**
- Example: `254712345678` (Kenya), `14155552345` (USA)

**Fix in Code Node**:
```javascript
// Clean phone number
let phone = $input.item.json.phone;

// Remove + if present
phone = phone.replace('+', '');

// Remove spaces and dashes
phone = phone.replace(/[\s-]/g, '');

return { cleanPhone: phone };
```

### Error 2: "JSON parameter needs to be valid JSON"

**Problem**: Your JSON payload is malformed or contains invalid characters.

**Solution**:
1. Use `JSON.stringify()` in Code node
2. Ensure no trailing commas
3. Check for unescaped quotes

**Correct Code Node Output**:
```javascript
const payload = {
  messaging_product: "whatsapp",
  to: "254712345678",
  type: "text",
  text: { body: "Hello!" }
};

// Return as object, n8n will handle JSON conversion
return { payload: payload };
```

Then in HTTP Request → Body:
```
{{ JSON.stringify($json.payload) }}
```

### Error 3: "Could not connect with provided credential"

**Problem**: Access token is invalid or expired.

**Solution**:
1. Check token hasn't expired (temporary tokens last 24 hours)
2. Verify token format: `Bearer YOUR_TOKEN`
3. Ensure space after "Bearer"
4. For production, use **System User Token** (permanent)

### Error 4: "Unsupported post request"

**Problem**: Wrong Phone Number ID or API version.

**Solution**:
1. Verify Phone Number ID is correct (from Meta dashboard)
2. Use latest API version: `v18.0` or `v19.0`
3. URL format: `https://graph.facebook.com/v18.0/{PHONE_NUMBER_ID}/messages`

### Error 5: "Recipient phone number not registered"

**Problem**: The recipient hasn't opted in to receive messages.

**Solution**:
1. In test mode, only send to verified test numbers
2. Add test numbers in: WhatsApp → API Setup → To (Test numbers)
3. For production, user must initiate conversation first or opt-in via template

### Error 6: "Template does not exist"

**Problem**: Using a template that isn't approved.

**Solution**:
1. Go to: WhatsApp → Message Templates
2. Create and submit templates for review
3. Wait for Meta approval (takes 24-48 hours)
4. Use approved template names only

---

## 4. Complete Example Node Configuration

### Using Your Workflow Data (Lead Qualification)

**Code Node: Prepare Message**
```javascript
// Get lead data
const lead = $input.item.json;

// Phone number cleanup
const cleanPhone = (phone) => {
  return phone.replace(/[\s+\-()]/g, '');
};

// Prepare WhatsApp payload
const payload = {
  messaging_product: "whatsapp",
  to: cleanPhone(lead.phone),
  type: "text",
  text: {
    body: `Hi ${lead.customerName}! 🎉\n\nGreat news! You qualify for our ${lead.preferredPackage} package.\n\nInstallation: ${lead.installationTown}\nDate: ${lead.installationDate}\n\nOur team will contact you at ${lead.phone} to confirm.\n\nThank you for choosing Bazztech Networks!`
  }
};

return {
  leadId: lead.id,
  whatsapp_payload: payload,
  phoneNumberId: $env.WHATSAPP_PHONE_NUMBER_ID || "YOUR_PHONE_NUMBER_ID"
};
```

**HTTP Request Node: Send WhatsApp Message**

- **Method**: POST
- **URL**: `https://graph.facebook.com/v18.0/{{ $json.phoneNumberId }}/messages`
- **Authentication**: Header Auth → WhatsApp Bearer Token
- **Headers**:
  ```json
  {
    "Content-Type": "application/json"
  }
  ```
- **Body** (JSON):
  ```
  {{ JSON.stringify($json.whatsapp_payload) }}
  ```

---

## 5. Environment Variables Setup

For security, store sensitive data in environment variables:

1. **In n8n Settings → Variables**, add:
   ```
   WHATSAPP_ACCESS_TOKEN=EAAVBv...your_token
   WHATSAPP_PHONE_NUMBER_ID=123456789012345
   WHATSAPP_VERIFY_TOKEN=your_random_string_123
   ```

2. **Use in workflows**:
   ```javascript
   $env.WHATSAPP_ACCESS_TOKEN
   $env.WHATSAPP_PHONE_NUMBER_ID
   ```

---

## 6. Testing Checklist

- [ ] Access token is valid and in correct format
- [ ] Phone Number ID is correct
- [ ] Recipient phone is in international format (no +)
- [ ] JSON payload is valid (test with JSON validator)
- [ ] Test number is added in Meta dashboard
- [ ] Credential is properly configured in n8n
- [ ] API version is current (v18.0 or v19.0)
- [ ] Headers include Content-Type: application/json

---

## 7. Quick Troubleshooting Command

**Test your WhatsApp API with curl:**

```bash
curl -X POST \
  'https://graph.facebook.com/v18.0/YOUR_PHONE_NUMBER_ID/messages' \
  -H 'Authorization: Bearer YOUR_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "messaging_product": "whatsapp",
    "to": "254712345678",
    "type": "text",
    "text": {
      "body": "Test message from n8n"
    }
  }'
```

Expected response (success):
```json
{
  "messaging_product": "whatsapp",
  "contacts": [{"input": "254712345678", "wa_id": "254712345678"}],
  "messages": [{"id": "wamid.XXX..."}]
}
```

---

## 8. Production Deployment Checklist

Before going live:

- [ ] Switch from temporary to **System User Token**
- [ ] Set app to **Live Mode** in Meta dashboard
- [ ] Complete **Business Verification**
- [ ] Set up **webhook** for receiving messages
- [ ] Configure **message templates** and get approvals
- [ ] Set up **rate limiting** (80 messages/second limit)
- [ ] Monitor **24-hour session windows**
- [ ] Set up **error notifications** in n8n

---

## 9. Your Existing Workflow Integration

Based on your `05_whatsapp_auto_responder.json`, you're already using:

1. **Webhook for receiving messages** ✅
2. **Customer lookup** ✅
3. **Interactive lists** ✅
4. **Lead creation** ✅

To add **outbound messaging** (like lead qualification notifications):

1. Use the pattern from your existing "Send WhatsApp Message" node (line 194-217)
2. Add credential: `WhatsApp Bearer Token` with proper access token
3. Use the dynamic payload structure you already have

**Example from your workflow:**
```javascript
// Your workflow already constructs payloads correctly!
const payload = {
  messaging_product: "whatsapp",
  to: from,
  type: "text",
  text: { body: messageText }
};
```

This is perfect! Just ensure:
- Credential is configured with valid token
- Phone Number ID is set correctly
- Recipients are in correct format

---

## Need Help?

Common issues:
1. **Can't send messages** → Check access token validity
2. **JSON errors** → Use `JSON.stringify()` wrapper
3. **Phone number errors** → Remove `+` and spaces
4. **Template errors** → Ensure template is approved

**Meta WhatsApp API Docs**: https://developers.facebook.com/docs/whatsapp/cloud-api/

**n8n HTTP Request Docs**: https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/

---

Good luck with your WhatsApp automation! 🚀
