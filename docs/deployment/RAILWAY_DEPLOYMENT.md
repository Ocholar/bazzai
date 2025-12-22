# Railway Deployment Guide - BAZZ AI Agentic Team

**Status**: GitHub repository created and code pushed ✅  
**Repository**: https://github.com/Ocholar/bazz-ai-agentic-team  
**Next Step**: Deploy to Railway (5-10 minutes)

---

## Quick Start: Deploy to Railway

### Step 1: Go to Railway Dashboard

1. Open https://railway.app/dashboard
2. Log in with your Railway account

### Step 2: Create New Project

1. Click **"New Project"** button (top right)
2. Select **"Deploy from GitHub"**
3. Connect your GitHub account if not already connected
4. Select repository: **`Ocholar/bazz-ai-agentic-team`**
5. Click **"Deploy"**

Railway will automatically:
- Detect the Node.js/React project
- Build the application
- Deploy to a live URL

### Step 3: Add MySQL Database

1. In your Railway project, click **"Add Service"**
2. Select **"Database"** → **"MySQL"**
3. Railway will automatically:
   - Create a MySQL database instance
   - Set the `DATABASE_URL` environment variable
   - Configure connection pooling

### Step 4: Configure Environment Variables

Once the project is created, go to **Settings** → **Variables** and add:

```
# Authentication
JWT_SECRET=your-secret-key-min-32-chars-generate-random
VITE_APP_ID=your-manus-app-id
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# Owner Information
OWNER_OPEN_ID=your-owner-open-id
OWNER_NAME=Your Name

# Application
VITE_APP_TITLE=BAZZ AI Agentic Team
VITE_APP_LOGO=/logo.svg

# Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=your-api-key
VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=your-analytics-endpoint
VITE_ANALYTICS_WEBSITE_ID=your-website-id

# Database (Auto-set by Railway)
# DATABASE_URL=mysql://user:password@host:port/database
```

**Note**: Generate a random `JWT_SECRET` using:
```bash
openssl rand -base64 32
```

### Step 5: Deploy

1. Railway will automatically build and deploy when you push to GitHub
2. Wait for the build to complete (5-10 minutes)
3. Once deployed, you'll see a live URL like:
   ```
   https://bazz-ai-agentic-team-production-xxxx.up.railway.app
   ```

### Step 6: Verify Deployment

1. Click the live URL
2. You should see the BAZZ AI dashboard login page
3. Log in with your Manus OAuth account
4. Verify all pages load correctly:
   - Dashboard (KPIs)
   - Leads (with CSV export)
   - Submissions (with CSV export)
   - Analytics
   - Configuration

---

## Troubleshooting

### Build Fails

**Error**: `pnpm: command not found`
- **Solution**: Railway should auto-detect pnpm. If not, add `NIXPACKS_PKGS=pnpm` to environment variables

**Error**: `DATABASE_URL not set`
- **Solution**: Make sure MySQL service is added to the project (Step 3)

### Application Won't Start

**Error**: `PORT not listening`
- **Solution**: The app runs on port 3000 by default. Railway will automatically expose it.

**Error**: `OAuth callback failing`
- **Solution**: Update `VITE_OAUTH_PORTAL_URL` and `OAUTH_SERVER_URL` to match your Manus OAuth configuration

### CSV Export Not Working

**Error**: `Download button does nothing`
- **Solution**: This is a browser feature. Make sure:
  - You're logged in
  - You have data in the table
  - Your browser allows downloads
  - Try a different browser if issues persist

---

## Live URLs (After Deployment)

Once deployed, you'll have:

| Service | URL |
|---------|-----|
| **Dashboard** | `https://bazz-ai-agentic-team-production-xxxx.up.railway.app` |
| **API Endpoint** | `https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc` |
| **GitHub Repository** | `https://github.com/Ocholar/bazz-ai-agentic-team` |

---

## Next Steps After Deployment

### 1. Set Up n8n Workflows

Once the dashboard is deployed, you can import the n8n workflows:

1. Access your n8n instance
2. Import the four workflow JSON files from `/n8n_workflows/`:
   - `01_lead_generation_agent.json`
   - `02_lead_qualification_agent.json`
   - `03_form_submission_agent.json`
   - `04_weekly_optimization_agent.json`
3. Configure credentials for each workflow
4. Activate workflows

See `n8n_workflows/README.md` for detailed configuration instructions.

### 2. Test CSV Export

1. Go to the **Leads** page
2. Click **"Export to CSV"** button
3. A CSV file should download with all leads data
4. Repeat for **Submissions** page

### 3. Monitor Performance

1. Check the **Dashboard** page daily for KPI metrics
2. Review the **Analytics** page weekly for trends
3. Check the **Configuration** page to adjust system settings

---

## Support

For issues or questions:

1. Check the `HANDOFF_DOCUMENT.md` for comprehensive troubleshooting
2. Review the `DEPLOYMENT_README.md` for detailed architecture information
3. Check Railway logs in the dashboard for deployment errors
4. Verify all environment variables are set correctly

---

## Summary

Your BAZZ AI Agentic Team infrastructure is now ready for deployment! The complete application includes:

- ✅ Full-stack React + Node.js/tRPC application
- ✅ Database schema with 5 tables
- ✅ Comprehensive dashboard UI with 5 pages
- ✅ CSV export functionality for leads and submissions
- ✅ 17 passing unit tests
- ✅ Four n8n workflows with documentation
- ✅ Private GitHub repository
- ✅ Ready for Railway deployment

**Estimated deployment time**: 5-10 minutes  
**Estimated n8n setup time**: 30-45 minutes  
**Total time to full system**: ~1 hour

Good luck! 🚀
