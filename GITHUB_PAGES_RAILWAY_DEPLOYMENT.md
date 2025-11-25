# BAZZ AI - GitHub Pages + Railway Deployment Guide

**Architecture**: Frontend on GitHub Pages + Backend on Railway

---

## Overview

Your BAZZ AI Agentic Team is deployed across two services:

| Service | Platform | URL | Purpose |
|---------|----------|-----|---------|
| **Frontend** | GitHub Pages | `https://bazzai.github.io` | React dashboard UI |
| **Backend API** | Railway | `https://bazz-ai-agentic-team-production-xxxx.up.railway.app` | Node.js/tRPC API |
| **Database** | Railway MySQL | Auto-configured | Data persistence |

---

## Step 1: Deploy Frontend to GitHub Pages

### 1.1 Configure GitHub Repository Settings

1. Go to https://github.com/Ocholar/bazzai
2. Click **Settings** → **Pages**
3. Under "Build and deployment":
   - Source: Select **"GitHub Actions"**
   - This enables the automated deployment workflow

### 1.2 Add GitHub Secrets

Go to **Settings** → **Secrets and variables** → **Actions** and add:

```
VITE_APP_ID=<your-manus-app-id>
VITE_OAUTH_PORTAL_URL=https://login.manus.im
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
VITE_FRONTEND_FORGE_API_KEY=<your-frontend-api-key>
VITE_ANALYTICS_ENDPOINT=<your-analytics-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
```

### 1.3 Trigger Deployment

Push any change to the `main` branch to trigger the GitHub Actions workflow:

```bash
cd /path/to/bazzai
git add .
git commit -m "Trigger GitHub Pages deployment"
git push origin main
```

Wait 2-3 minutes for the deployment to complete. Check **Actions** tab to see build status.

### 1.4 Verify Frontend Deployment

Once complete, visit: **https://bazzai.github.io**

You should see the BAZZ AI dashboard login page.

---

## Step 2: Deploy Backend to Railway

### 2.1 Create Railway Project

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub"**
4. Select repository: **`Ocholar/bazz-ai-agentic-team`** (the backend version)
5. Click **"Deploy"**

Railway will automatically detect the Node.js project and start building.

### 2.2 Add MySQL Database

1. In your Railway project, click **"Add Service"**
2. Select **"Database"** → **"MySQL"**
3. Railway automatically configures `DATABASE_URL` environment variable

### 2.3 Configure Environment Variables

Go to **Settings** → **Variables** and add:

```
# Authentication
JWT_SECRET=<generate-random-32-chars>
VITE_APP_ID=<your-manus-app-id>
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im

# Owner Information
OWNER_OPEN_ID=<your-owner-open-id>
OWNER_NAME=<Your Name>

# Manus APIs
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=<your-api-key>
VITE_FRONTEND_FORGE_API_KEY=<your-frontend-api-key>
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im

# Analytics (Optional)
VITE_ANALYTICS_ENDPOINT=<your-analytics-endpoint>
VITE_ANALYTICS_WEBSITE_ID=<your-website-id>
```

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

### 2.4 Wait for Deployment

Railway will automatically build and deploy. Wait 5-10 minutes for completion.

Once deployed, you'll see a live URL like:
```
https://bazz-ai-agentic-team-production-xxxx.up.railway.app
```

### 2.5 Verify Backend Deployment

Test the API by visiting:
```
https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc/auth.me
```

You should see a JSON response (might be an auth error, which is expected).

---

## Step 3: Connect Frontend to Backend

### 3.1 Update Frontend API Configuration

The frontend needs to know the backend API URL. Edit the frontend code:

1. Go to `src/lib/trpc.ts` in the bazzai repository
2. Update the API URL to point to your Railway backend:

```typescript
// Before:
const url = `${import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'}/api/trpc`;

// After:
const url = `https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc`;
```

Replace `xxxx` with your actual Railway URL.

### 3.2 Redeploy Frontend

Push the changes to trigger GitHub Pages redeploy:

```bash
cd /path/to/bazzai
git add src/lib/trpc.ts
git commit -m "Update backend API URL for Railway"
git push origin main
```

Wait 2-3 minutes for GitHub Pages to rebuild and deploy.

### 3.3 Test Frontend-Backend Connection

1. Visit https://bazzai.github.io
2. Try to log in with your Manus OAuth account
3. If successful, you should see the dashboard with KPI data
4. Check the browser console (F12) for any CORS or API errors

---

## Step 4: Set Up n8n Workflows (Optional)

Once both frontend and backend are deployed, you can set up the n8n workflows:

### 4.1 Access n8n Instance

Navigate to your n8n instance (deployed separately or existing instance)

### 4.2 Import Workflows

For each workflow JSON file:
1. Click **"Create"** → **"Import from file"**
2. Select workflow JSON from `/n8n_workflows/`:
   - `01_lead_generation_agent.json`
   - `02_lead_qualification_agent.json`
   - `03_form_submission_agent.json`
   - `04_weekly_optimization_agent.json`

### 4.3 Configure Credentials

For each workflow, set up credentials:

**Dashboard API:**
- Base URL: `https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc`
- Headers: `Authorization: Bearer <JWT_TOKEN>`

**LLM API:**
- Base URL: `https://api.manus.im`
- Headers: `Authorization: Bearer <YOUR_API_KEY>`

**Other APIs** (WhatsApp, Google Places, Facebook, LinkedIn):
- Obtain credentials from respective platforms
- Add to n8n credential store

### 4.4 Activate Workflows

Once configured:
1. Click **"Activate"** toggle for each workflow
2. Verify execution history shows successful runs
3. Check dashboard for new leads/submissions

---

## Deployment Checklist

### Frontend (GitHub Pages)
- [ ] Repository created: https://github.com/Ocholar/bazzai
- [ ] GitHub Pages enabled (Settings → Pages → GitHub Actions)
- [ ] Secrets configured in GitHub
- [ ] Workflow triggered and completed
- [ ] Frontend accessible at https://bazzai.github.io
- [ ] Login page displays correctly

### Backend (Railway)
- [ ] Repository configured: https://github.com/Ocholar/bazz-ai-agentic-team
- [ ] Railway project created
- [ ] MySQL database service added
- [ ] Environment variables configured
- [ ] Build completed successfully
- [ ] Backend accessible at deployed URL
- [ ] API responds to requests

### Integration
- [ ] Frontend API URL updated to point to Railway backend
- [ ] Frontend redeployed to GitHub Pages
- [ ] Frontend can log in successfully
- [ ] Dashboard displays KPI data
- [ ] No CORS errors in browser console

### n8n (Optional)
- [ ] n8n instance accessible
- [ ] All four workflows imported
- [ ] Credentials configured
- [ ] Workflows tested manually
- [ ] Workflows activated

---

## Live URLs

Once deployed, you'll have:

| Service | URL |
|---------|-----|
| **Frontend** | https://bazzai.github.io |
| **Backend API** | https://bazz-ai-agentic-team-production-xxxx.up.railway.app |
| **API Base** | https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc |
| **Frontend Repo** | https://github.com/Ocholar/bazzai |
| **Backend Repo** | https://github.com/Ocholar/bazz-ai-agentic-team |

---

## Troubleshooting

### Frontend Won't Load

**Problem**: Blank page or 404 at https://bazzai.github.io  
**Solutions**:
1. Check GitHub Actions workflow status (Actions tab)
2. Verify GitHub Pages is enabled (Settings → Pages)
3. Check browser console for errors (F12)
4. Clear browser cache and reload

### Frontend Can't Connect to Backend

**Problem**: CORS error or "Cannot connect to API"  
**Solutions**:
1. Verify backend URL is correct in `src/lib/trpc.ts`
2. Check Railway backend is running and accessible
3. Verify CORS configuration in `server/_core/index.ts` includes GitHub Pages URL
4. Check browser console for specific error messages

### Login Fails

**Problem**: OAuth login not working  
**Solutions**:
1. Verify `VITE_APP_ID` and `VITE_OAUTH_PORTAL_URL` are correct
2. Check Manus OAuth configuration
3. Verify backend can reach Manus OAuth server
4. Check Railway logs for OAuth errors

### No Data in Dashboard

**Problem**: Dashboard loads but shows no KPI data  
**Solutions**:
1. Verify database connection (check Railway MySQL status)
2. Run database migrations: `pnpm db:push`
3. Seed sample data if needed
4. Check API response in browser DevTools Network tab

### CSV Export Not Working

**Problem**: Download button does nothing  
**Solutions**:
1. Verify you're logged in
2. Check that table has data
3. Try a different browser
4. Disable ad blockers (they sometimes block downloads)
5. Check browser console for JavaScript errors

---

## Performance Monitoring

### Monitor Frontend
- GitHub Pages automatically serves from CDN (fast)
- Check Actions tab for deployment status
- Monitor page load time in browser DevTools

### Monitor Backend
- Railway dashboard shows CPU, memory, and network usage
- Check Railway logs for errors
- Monitor API response times in browser DevTools

### Monitor Database
- Railway MySQL dashboard shows connection count and queries
- Check for slow queries in Railway logs
- Monitor disk usage for growth

---

## Updating Your Application

### Update Frontend

```bash
cd /path/to/bazzai
# Make changes
git add .
git commit -m "Update frontend"
git push origin main
# GitHub Pages automatically redeploys (2-3 minutes)
```

### Update Backend

```bash
cd /path/to/bazz-ai-agentic-team
# Make changes
git add .
git commit -m "Update backend"
git push origin main
# Railway automatically redeploys (5-10 minutes)
```

---

## Cost Estimate

| Service | Cost | Notes |
|---------|------|-------|
| GitHub Pages | FREE | Unlimited static hosting |
| Railway Backend | ~$5-10/month | Includes 500 GB bandwidth free tier |
| Railway MySQL | ~$5-10/month | Includes 1 GB storage free tier |
| **Total** | ~$10-20/month | Very affordable for production |

---

## Support

For issues or questions:

1. Check this guide's troubleshooting section
2. Review GitHub Actions logs (frontend)
3. Review Railway logs (backend)
4. Check browser console (F12) for errors
5. Refer to project documentation in repositories

---

## Summary

Your BAZZ AI Agentic Team is now deployed across:
- **Frontend**: GitHub Pages (free, fast, reliable)
- **Backend**: Railway (affordable, scalable, easy to manage)
- **Database**: Railway MySQL (reliable, auto-backups)

This architecture provides:
- ✅ Fast frontend delivery via CDN
- ✅ Scalable backend with auto-scaling
- ✅ Automatic deployments on code push
- ✅ Low operational overhead
- ✅ Professional, production-ready setup

**Estimated total deployment time**: 15-20 minutes  
**Estimated monthly cost**: $10-20  
**Uptime**: 99.9%+

Good luck! 🚀
