# 🤖 Gemini API Configuration for Social Media Auto-Poster

**Your Gemini API Key:** `AIzaSyA5ZbhhDfnWoMsuLo7ekaD0d9PbnSziN60`

---

## 📋 **Step-by-Step Setup**

### **Step 1: Create Gemini Credential in n8n**

1. **Open n8n** (your Railway instance)
2. Click **"Credentials"** in the left sidebar
3. Click **"+ Add Credential"**
4. Search for **"HTTP Header Auth"**
5. Fill in:
   - **Name:** `Manus LLM API Key`
   - **Header Name:** `x-goog-api-key`
   - **Header Value:** `AIzaSyA5ZbhhDfnWoMsuLo7ekaD0d9PbnSziN60`
6. Click **"Save"**

---

### **Step 2: Update the Workflow**

1. **Open workflow:** `06_social_media_auto_poster`
2. **Click on:** "Generate Content (AI)" node (the purple one)
3. **Update these settings:**

#### **URL:**
Change from:
```
={{$env.MANUS_LLM_API_URL}}/v1/chat/completions
```

To:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent
```

#### **Authentication:**
- Type: **Generic Credential Type**
- Generic Auth Type: **HTTP Header Auth**
- Credential: **Manus LLM API Key** (the one you just created)

#### **JSON Body:**
Replace the entire JSON body with:
```json
{
  "contents": [{
    "parts": [{
      "text": "You are a social media manager for Bazztech Networks, a Kenyan ISP providing 5G and Fiber internet. Create engaging, professional posts that drive engagement and conversions. Always include relevant emojis and a clear call-to-action.\n\n{{$json.prompt}}"
    }]
  }],
  "generationConfig": {
    "temperature": 0.8,
    "maxOutputTokens": 150
  }
}
```

4. **Save** the workflow

---

### **Step 3: Update "Format Post Content" Node**

1. **Click on:** "Format Post Content" node
2. **Update the JavaScript code:**

Replace:
```javascript
const aiResponse = $input.item.json.choices[0].message.content;
```

With:
```javascript
const aiResponse = $input.item.json.candidates[0].content.parts[0].text;
```

The rest of the code stays the same.

3. **Save** the workflow

---

### **Step 4: Test the Workflow**

1. Click **"Execute Workflow"** button (top right)
2. Check the output of each node
3. Verify the generated content looks good
4. Check if posts appear on Facebook/Instagram

---

## ✅ **Expected Result**

The workflow will now:
1. ✅ Select a random topic every 6 hours
2. ✅ Use Gemini to generate engaging content
3. ✅ Format the post with hashtags and link
4. ✅ Post to Facebook
5. ✅ Post to Instagram (with image)
6. ✅ Log analytics

---

## 🚨 **Troubleshooting**

### **Error: "API key not valid"**
- Double-check the API key in the credential
- Make sure there are no extra spaces

### **Error: "Model not found"**
- Verify the URL is exactly: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`

### **Error: "candidates is undefined"**
- Make sure you updated the "Format Post Content" node code

---

**Once configured, your social media will post automatically every 6 hours!** 🎉
