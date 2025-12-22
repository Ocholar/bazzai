# BAZZ AI Agentic Team - Deployment Guide

This document provides comprehensive instructions for deploying the BAZZ AI Agentic Team infrastructure to Railway.

## Project Overview

The BAZZ AI Agentic Team is a fully autonomous Sales & Marketing system designed to achieve and sustain 400+ monthly Gross Adds for Airtel Kenya 5G ODU within 90 days. The system consists of three main components:

1. **Bazztech Dashboard API** - Node.js/Express backend with tRPC
2. **Bazztech Dashboard Frontend** - React 19 with Tailwind CSS
3. **n8n Workflows** - Four autonomous workflows for lead generation, qualification, form submission, and optimization

## Technology Stack

- **Backend**: Node.js 22, Express 4, tRPC 11, Drizzle ORM
- **Frontend**: React 19, Tailwind CSS 4, TypeScript
- **Database**: MySQL/TiDB
- **Workflows**: n8n (self-hosted)
- **Authentication**: Manus OAuth
- **Deployment**: Railway

## Project Structure

```
bazz-ai-agentic-team/
├── client/                 # React frontend
│   ├── src/
│   │   ├── pages/         # Dashboard pages
│   │   ├── components/    # Reusable components
│   │   └── lib/           # tRPC client
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── routers.ts         # tRPC procedures
│   ├── db.ts              # Database queries
│   └── _core/             # Core infrastructure
├── drizzle/               # Database schema and migrations
├── n8n_workflows/         # n8n workflow JSON files
├── package.json
└── tsconfig.json
```

## Database Schema

The application uses five main tables:

1. **users** - User authentication and profiles
2. **leads** - All acquired leads from various sources
3. **submissions** - Form submissions to Airtel
4. **analytics** - Daily performance metrics
5. **config** - System configuration and settings

## Deployment Steps

### Step 1: Prerequisites

- Railway account (https://railway.app)
- GitHub account with access to create repositories
- n8n instance (can be deployed on Railway or self-hosted)
- MySQL/TiDB database (Railway provides this)

### Step 2: Create GitHub Repository

1. Create a new private repository under your GitHub account
2. Clone this project to the repository
3. Push all code to GitHub

```bash
git init
git add .
git commit -m "Initial commit: BAZZ AI Agentic Team"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/bazz-ai-agentic-team.git
git push -u origin main
```

### Step 3: Deploy to Railway

1. **Create a new Railway project**
   - Go to https://railway.app/dashboard
   - Click "New Project"
   - Select "Deploy from GitHub"
   - Connect your GitHub account and select the repository

2. **Configure Environment Variables**
   
   The following environment variables are required:
   
   ```
   DATABASE_URL=mysql://user:password@host:port/database
   JWT_SECRET=your-secret-key
   VITE_APP_ID=your-manus-app-id
   OAUTH_SERVER_URL=https://api.manus.im
   VITE_OAUTH_PORTAL_URL=https://login.manus.im
   OWNER_OPEN_ID=your-owner-open-id
   OWNER_NAME=Your Name
   VITE_APP_TITLE=BAZZ AI Agentic Team
   VITE_APP_LOGO=/logo.svg
   BUILT_IN_FORGE_API_URL=https://api.manus.im
   BUILT_IN_FORGE_API_KEY=your-api-key
   VITE_FRONTEND_FORGE_API_KEY=your-frontend-api-key
   VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
   VITE_ANALYTICS_ENDPOINT=your-analytics-endpoint
   VITE_ANALYTICS_WEBSITE_ID=your-website-id
   ```

3. **Add MySQL/TiDB Service**
   - In Railway project, click "Add Service"
   - Select "MySQL" or "TiDB"
   - Railway will automatically set the `DATABASE_URL`

4. **Deploy**
   - Railway will automatically deploy from the main branch
   - The application will be available at `https://your-project.up.railway.app`

### Step 4: Configure n8n

1. **Deploy n8n on Railway** (or use existing instance)
   - Add a new service: n8n
   - Configure database connection to use the same MySQL instance
   - Set up authentication

2. **Import Workflows**
   - Access n8n dashboard
   - Import the four workflow JSON files from `n8n_workflows/`:
     - `01_lead_generation_agent.json`
     - `02_lead_qualification_agent.json`
     - `03_form_submission_agent.json`
     - `04_weekly_optimization_agent.json`

3. **Configure Credentials**
   - Set up Manus LLM API credentials
   - Configure WhatsApp Business API (if using)
   - Set up dashboard API endpoint (tRPC URL)
   - Configure any other required credentials

### Step 5: Verify Deployment

1. **Test Dashboard**
   - Navigate to `https://your-project.up.railway.app`
   - Log in with your Manus OAuth account
   - Verify all pages load correctly

2. **Test API Endpoints**
   ```bash
   curl https://your-project.up.railway.app/api/trpc/leads.getAll
   ```

3. **Test n8n Workflows**
   - Manually trigger each workflow
   - Verify data flows correctly between n8n and the dashboard API

## Configuration Guide

### Lead Generation Settings

- **High-Value Lead Allocation**: Percentage of leads from premium sources (LinkedIn, Google Maps)
- **Lead Generation Frequency**: How often to run the lead generation workflow
- **Default**: 60% high-value, every 6 hours

### Lead Qualification Settings

- **30Mbps Upselling Aggressiveness**: Controls how aggressively the LLM promotes the 30Mbps package
- **Qualification Frequency**: How often to run the qualification workflow
- **Default**: High aggressiveness, every 2 hours

### Form Submission Settings

- **Maximum Retry Attempts**: Number of times to retry failed submissions
- **Submission Frequency**: How often to run the submission workflow
- **Default**: 3 retries, every 4 hours

## Monitoring and Maintenance

### Dashboard Metrics

The dashboard displays real-time KPIs:
- Monthly Gross Adds (target: 400+)
- Total Leads (target: 600+)
- Conversion Rate (target: 20%+)
- 30Mbps Package Mix (target: 70%+)
- Submission Success Rate (target: >97%)

### Weekly Optimization

The system automatically runs a weekly optimization workflow every Monday at 9 AM that:
- Analyzes performance metrics
- Identifies bottlenecks
- Generates optimization recommendations
- Sends reports to the project owner

### Troubleshooting

**Issue**: Workflows not running
- Check n8n service is running
- Verify API credentials are correct
- Check database connectivity

**Issue**: Low lead quality
- Adjust lead source allocation
- Review lead qualification criteria
- Check LLM prompt configuration

**Issue**: Low submission success rate
- Verify Airtel form endpoint is accessible
- Check form payload structure
- Review error logs in submissions table

## API Documentation

### tRPC Endpoints

#### Leads
- `leads.create` - Create a new lead
- `leads.getAll` - Retrieve all leads
- `leads.getById` - Get specific lead
- `leads.getByStatus` - Filter leads by status
- `leads.updateStatus` - Update lead status

#### Submissions
- `submissions.create` - Create submission record
- `submissions.getAll` - Retrieve all submissions
- `submissions.getByLeadId` - Get submission for lead
- `submissions.getByStatus` - Filter by status
- `submissions.updateStatus` - Update submission status

#### Analytics
- `analytics.create` - Create analytics record
- `analytics.getLatest` - Get latest metrics
- `analytics.getByDateRange` - Get metrics for date range

#### Configuration
- `config.get` - Get configuration by key
- `config.getAll` - Get all configuration
- `config.set` - Set configuration value

## Performance Targets (90 Days)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Monthly Gross Adds | 400+ GAs | Confirmed installations |
| 30Mbps Package Mix | 70%+ | Percentage of 30Mbps sales |
| Form Submission Success Rate | >97% | Successful submissions / Total |
| Lead-to-Install Conversion Rate | 20%+ | Total GAs / Total Leads |
| Avg Commission per GA | KES 2,500+ | Weighted average |
| Lead Acquisition Cost | KES 0 | Zero-cost tools only |
| System Uptime | 99%+ | Workflow execution reliability |

## Support and Maintenance

For issues or questions:
1. Check the troubleshooting guide above
2. Review n8n workflow logs
3. Check database for error records
4. Review analytics dashboard for performance insights

## Next Steps

1. Deploy to Railway following the steps above
2. Configure n8n workflows with your credentials
3. Monitor the dashboard for the first week
4. Adjust configuration based on performance metrics
5. Scale workflows based on lead volume and conversion rates

---

**Last Updated**: November 25, 2025
**Version**: 1.0
**Author**: Manus AI
