# n8n Lead Generation Workflow Setup Guide

## Overview
This guide will help you set up the automated lead generation workflow using n8n to collect leads from various sources and send them to your BAZZ AI dashboard.

## Prerequisites
- n8n instance (cloud or self-hosted)
- Railway backend deployed and running
- Access to the n8n workflow files in `bazz-ai-backend/n8n_workflows/`

## Backend Endpoint

The backend now has a REST API endpoint ready to receive leads from n8n:

**Endpoint**: `https://bazz-ai-agentic-team-production.up.railway.app/api/leads/create`

**Method**: POST

**Payload Format**:
```json
{
  "source": "linkedin|google_maps|whatsapp|facebook|website",
  "tag": "high_value|high_volume",
  "customerName": "John Doe",
  "phone": "0712345678",
  "email": "john@example.com"
}
```

**Response**:
```json
{
  "success": true,
  "leadId": 123
}
```

**Alternative Endpoint (Flexible)**: `https://bazz-ai-agentic-team-production.up.railway.app/api/store-lead`
- **Method**: POST
- **Payload**: Flexible (accepts `phone` or `phoneNumber`, `name` or `customerName`, etc.)
- **Best for**: Direct integration with n8n nodes that might have varying output field names.

## Step-by-Step Setup

### 1. Import Workflow into n8n

1. Log into your n8n instance
2. Click **"Workflows"** → **"Add Workflow"** → **"Import from File"**
3. Select `bazz-ai-backend/n8n_workflows/01_lead_generation_agent.json`
4. The workflow will be imported with all nodes configured

### 2. Configure Environment Variables in n8n

In your n8n instance, set the following environment variable:

```bash
DASHBOARD_API_URL=https://bazz-ai-agentic-team-production.up.railway.app/api/leads/create
```

**How to set environment variables in n8n:**
- **Cloud**: Settings → Environment Variables
- **Self-hosted**: Add to your `.env` file or docker-compose.yml

### 3. Update Scraper API URLs

The workflow currently has placeholder URLs for scrapers. You need to replace them with actual scraper services:

#### LinkedIn Scraper Node
- **Current**: `https://api.example.com/linkedin/scrape`
- **Replace with**: Your LinkedIn scraper API endpoint
- **Recommended services**: 
  - Apify LinkedIn Scraper
  - Phantombuster LinkedIn Search Export
  - Custom scraper using Puppeteer

#### Google Maps Scraper Node
- **Current**: `https://api.example.com/google-maps/scrape`
- **Replace with**: Your Google Maps scraper API endpoint
- **Recommended services**:
  - Outscraper Google Maps API
  - Apify Google Maps Scraper
  - SerpApi Google Maps API

#### WhatsApp Scraper Node
- **Current**: `https://api.example.com/whatsapp/scrape`
- **Replace with**: Your WhatsApp scraper API endpoint
- **Note**: WhatsApp scraping requires careful compliance with their ToS

#### Facebook Scraper Node
- **Current**: `https://api.example.com/facebook/scrape`
- **Replace with**: Your Facebook scraper API endpoint
- **Recommended services**:
  - Facebook Graph API (official)
  - Apify Facebook Pages Scraper

### 4. Configure Scraper Credentials

For each scraper node:

1. Click on the node
2. Under **"Authentication"**, select **"Header Auth"**
3. Add your API key/token in the credentials
4. Save the credentials

### 5. Test the Workflow

#### Manual Test:
1. Click **"Execute Workflow"** button
2. Check the execution log for errors
3. Verify leads appear in your dashboard at `https://ocholar.github.io/bazzai/#/leads`

#### Test with Mock Data:
Replace one of the scraper nodes temporarily with a **"Set"** node containing test data:

```json
{
  "name": "Test Company",
  "phone": "0712345678",
  "email": "test@company.com",
  "source": "linkedin"
}
```

### 6. Activate the Workflow

Once testing is successful:

1. Click the **"Active"** toggle at the top right
2. The workflow will now run daily (every 24 hours)
3. Monitor the execution history for any failures

## Workflow Logic

### Lead Flow:
```
Schedule Trigger (Daily)
    ├── LinkedIn Scraper → Tag as "high_value"
    ├── Google Maps Scraper → Tag as "high_value"
    ├── WhatsApp Scraper → Tag as "high_volume"
    └── Facebook Scraper → Tag as "high_volume"
            ↓
        Merge All Leads
            ↓
    Store in Dashboard (POST /api/leads/create)
```

### Lead Tagging Strategy:
- **high_value**: LinkedIn, Google Maps (corporate offices, law firms, consultancies)
- **high_volume**: WhatsApp, Facebook (business groups, marketplaces)

## Monitoring & Optimization

### Check Execution Logs:
1. Go to **"Executions"** in n8n
2. Review successful and failed executions
3. Check error messages for debugging

### Monitor Lead Quality:
1. Go to your dashboard Analytics page
2. Review **"Source Performance"** table
3. Adjust scraper queries based on conversion rates

### Optimize Lead Allocation:
Based on performance data, adjust the `limit` parameter in each scraper:
- High-performing sources: Increase limit
- Low-performing sources: Decrease limit or pause

## Troubleshooting

### Issue: "Failed to create lead"
**Solution**: Check Railway logs for detailed error messages
```bash
# View logs in Railway dashboard
# Or use Railway CLI:
railway logs
```

### Issue: Scraper returns no data
**Solution**: 
- Verify API credentials are correct
- Check scraper API quotas/limits
- Test scraper API directly with Postman

### Issue: Leads not appearing in dashboard
**Solution**:
- Verify `DASHBOARD_API_URL` is set correctly
- Check that `source` and `tag` fields match allowed enum values
- Ensure `phone` field is provided (required)

## Advanced Configuration

### Adjust Schedule:
Edit the **"Schedule Trigger"** node to change frequency:
- Every 12 hours: `hoursInterval: 12`
- Every 6 hours: `hoursInterval: 6`
- Specific time: Use cron expression

### Add More Sources:
1. Duplicate an existing scraper node
2. Update the API URL and query
3. Connect to the appropriate "Tag" node
4. Update the "Merge" node connections

### Filter Leads:
Add an **"IF"** node after scrapers to filter based on criteria:
```javascript
// Example: Only include leads with email
{{ $json.email !== null && $json.email !== "" }}
```

## Cost Optimization

### Free Tier Options:
- **n8n**: Self-host on Railway/Render (free tier available)
- **Scrapers**: Use free tiers of Apify, Outscraper (limited requests)
- **Alternative**: Build custom scrapers with Puppeteer on Google Cloud Functions

### Paid Recommendations:
- **n8n Cloud**: $20/month (easiest setup)
- **Apify**: Pay-as-you-go (good for testing)
- **Outscraper**: $49/month (unlimited Google Maps scraping)

## Next Steps

1. ✅ Import workflow into n8n
2. ✅ Configure environment variables
3. ✅ Set up scraper API credentials
4. ✅ Test with mock data
5. ✅ Activate workflow
6. 📊 Monitor performance in dashboard
7. 🔧 Optimize based on conversion data

## Support

If you encounter issues:
1. Check Railway logs for backend errors
2. Review n8n execution logs
3. Verify all environment variables are set
4. Test each scraper API independently

---

**Last Updated**: 2025-11-29
**Backend Version**: 1.0.0
**Workflow Version**: 2.0
