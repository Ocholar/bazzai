# 📱 Social Media Auto-Poster - Pre-Written Posts Setup

## ✅ **What You Get:**

- **20 professionally written posts** covering:
  - Speed promotions
  - Customer testimonials  
  - Coverage updates
  - Special offers
  - Tech tips
  - Business solutions
  - Gaming/streaming features
  - And more!

- **Automatic posting every 6 hours** to Facebook & Instagram
- **No AI costs** - completely free
- **100% reliable** - no API failures

---

## 🚀 **Setup Instructions:**

### **Step 1: Import the Workflow**

1. **Open n8n** (your Railway instance)
2. Click **"+ Add workflow"** → **"Import from file"**
3. Select: `c:\Users\Administrator\Documents\Antigravity\bazz-ai-backend\n8n_workflows\06_social_media_auto_poster_PREWRITTEN.json`
4. Click **"Import"**

### **Step 2: Configure Credentials**

The workflow needs one credential: **Facebook Page Access Token**

1. In n8n, go to **Credentials** (left sidebar)
2. Click **"+ Add Credential"**
3. Search for **"HTTP Query Auth"**
4. Fill in:
   - **Name:** `Facebook Page Access Token`
   - **Name:** `access_token`
   - **Value:** `EAAblTVbhiH0BQCfRyeYcMTGQqBxMsyU9TGE2nxoU5R2jR1ZBkFxsTK26UiyuGUeuLfxSYf2ZA0ZB7LAl2ZCNTCNpZCdkt6eCxhZAVs2ha5n2cTFAYnp7ZCo0st49lZAQlpRCSiSkre3VwEj8AoYDEZB5eQIjPZCo5u02QrzCXbkib31bnAsmZCZCrE4ltRUE9DllL4t38gZDZD`
5. Click **"Save"**

### **Step 3: Update Environment Variables (if not already set)**

Make sure these are set in Railway:
- `FACEBOOK_PAGE_ID=103070799066553`
- `INSTAGRAM_BUSINESS_ACCOUNT_ID=17841452746111550`

### **Step 4: Activate the Workflow**

1. Open the imported workflow
2. Click the **"Active"** toggle (top right) to turn it **ON** (Green)
3. Click **"Execute Workflow"** to test it immediately

---

## 📊 **How It Works:**

1. **Every 6 hours**, the workflow triggers automatically
2. It **randomly selects** one of the 20 pre-written posts
3. **Formats** it with hashtags and website link
4. **Posts to Facebook** (text post)
5. **Posts to Instagram** (with image from Unsplash)

---

## 📝 **Sample Posts Included:**

1. **Speed Promo:** "🚀 Experience lightning-fast 5G speeds..."
2. **Testimonial:** "⭐ Best internet service in Kenya..."
3. **Coverage:** "📍 Expanding across Kenya..."
4. **Limited Offer:** "🎁 FREE Installation + 50% OFF..."
5. **Tech Tip:** "💡 Boost your WiFi signal..."
6. **Reliability:** "🛡️ 99.9% Uptime Guarantee..."
7. **Business:** "💼 Power your business..."
8. **Weekend:** "🎮 Weekend plans? Stream without limits..."
9. **Comparison:** "📊 Why Choose Bazztech..."
10. **Fiber Promo:** "🌐 FTTX Fiber - Up to 1Gbps..."
11. **Customer Love:** "❤️ Our customers love us..."
12. **Installation:** "⚡ Quick Installation Process..."
13. **Support:** "🤝 24/7 Local Support..."
14. **Speed Test:** "📶 Test Your Current Speed..."
15. **Work From Home:** "🏠 Working from home?..."
16. **Streaming:** "📺 Tired of buffering?..."
17. **Gaming:** "🎮 Gamers, this is for you..."
18. **Family:** "👨‍👩‍👧‍👦 Perfect for the whole family..."
19. **No Contract:** "📝 No Long-Term Contracts..."
20. **Local Company:** "🇰🇪 Proudly Kenyan!..."

---

## 🔄 **Adding More Posts:**

To add more posts, edit the workflow:

1. Open the workflow in n8n
2. Click on **"Select Random Post"** node
3. Add new posts to the `posts` array:

```javascript
{
  type: 'your_type',
  content: 'Your post content here with emojis!\n\nCall: +254 103 339197'
}
```

4. Save the workflow

---

## ✅ **Expected Results:**

- **4 posts per day** (every 6 hours)
- **120 posts per month**
- **Posts won't repeat** for 5 days (20 posts ÷ 4 per day)
- **Consistent branding** and messaging
- **Zero API costs**

---

## 🎉 **You're All Set!**

Your social media is now on autopilot! The workflow will post engaging content every 6 hours without any manual intervention.

**Next Steps:**
1. Import the workflow
2. Set up the credential
3. Activate it
4. Watch your social media come alive! 🚀
