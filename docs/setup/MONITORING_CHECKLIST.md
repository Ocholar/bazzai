# 🔍 Bazztech AI System - Monitoring Checklist

**Date:** 2025-11-30
**Time:** 18:13 EAT

---

## 📋 **Monitoring Tasks**

### **1. WhatsApp Auto-Responder Test** ⏳
- [ ] Send test message: "Hi" to +254 103 339197
- [ ] Verify welcome message received
- [ ] Send test message: "How much is 5G?"
- [ ] Verify pricing response received
- [ ] Send test message: "I need support"
- [ ] Verify support message shows **+254 103 339197** (not old number)
- [ ] Check n8n execution log for workflow success
- [ ] Verify new lead created in dashboard (for new customer)

**Expected Response Times:** < 5 seconds

---

### **2. Social Media Auto-Poster** ⏳
**Next scheduled post:** Check n8n for next execution time

- [ ] Check Facebook Page for new post
- [ ] Check Instagram for new post
- [ ] Verify post content is relevant and professional
- [ ] Check n8n execution log for success/errors
- [ ] Verify analytics logged in dashboard

**Posting Schedule:** Every 6 hours

---

### **3. Lead Generation Agent** ⏳
**Check n8n for last execution**

- [ ] Review scraped leads in dashboard
- [ ] Verify lead sources (Google Maps, LinkedIn)
- [ ] Check data quality (name, phone, location)
- [ ] Review n8n execution log for errors

**Expected:** 10-50 new leads per run

---

### **4. Lead Qualification Agent** ⏳
**Runs after Lead Generation**

- [ ] Check lead scores in dashboard
- [ ] Verify AI scoring logic (high_value, medium, low)
- [ ] Review qualification criteria
- [ ] Check n8n execution log

**Expected:** Leads tagged as high_value, medium, or low

---

### **5. Form Submission Agent** ⏳
**Triggered manually or by qualification**

- [ ] Check Airtel form submission status
- [ ] Verify Puppeteer automation success
- [ ] Review submitted lead data
- [ ] Check for any errors in n8n log

**Expected:** Successful form submission with confirmation

---

### **6. Weekly Optimization Agent** ⏳
**Next run:** Sunday (Check n8n schedule)

- [ ] Review performance metrics analyzed
- [ ] Check prompt adjustments made
- [ ] Verify optimization recommendations
- [ ] Review n8n execution log

**Expected:** Autonomous prompt improvements based on data

---

## 🚨 **Common Issues to Watch For**

### **WhatsApp:**
- ❌ Token expired → Re-generate in Meta Dashboard
- ❌ Webhook not responding → Check Railway deployment
- ❌ Messages not sending → Verify WHATSAPP_PHONE_NUMBER_ID

### **Social Media:**
- ❌ Posts failing → Check Facebook/Instagram permissions
- ❌ Token expired → Re-generate System User Token
- ❌ Content inappropriate → Review AI prompt

### **Lead Generation:**
- ❌ No leads found → Adjust search criteria
- ❌ Duplicate leads → Check deduplication logic
- ❌ Invalid data → Review scraping selectors

### **Form Submission:**
- ❌ Puppeteer timeout → Increase wait time
- ❌ Form fields not found → Update selectors
- ❌ Submission failed → Check Airtel form changes

---

## 📊 **Success Metrics**

### **Daily:**
- WhatsApp responses: > 90% success rate
- Social posts: 4 posts/day (every 6 hours)
- New leads: 20-100 per day

### **Weekly:**
- Lead conversion: > 5% to qualified
- Form submissions: > 80% success rate
- System uptime: > 99%

---

## 🔗 **Quick Links**

- **n8n Dashboard:** https://n8n-production-c726.up.railway.app
- **Meta Business Suite:** https://business.facebook.com
- **WhatsApp Manager:** https://business.facebook.com/wa/manage/
- **Railway Dashboard:** https://railway.app

---

**Last Updated:** 2025-11-30 18:13 EAT
