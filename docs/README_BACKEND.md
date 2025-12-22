# BAZZ AI Backend - Railway Deployment

This is the **backend-only** repository for the BAZZ AI Agentic Team, deployed on Railway.

## Architecture

This repository contains:
- Node.js Express server with tRPC API
- MySQL database integration with Drizzle ORM
- Manus OAuth authentication
- 17 tRPC procedures for leads, submissions, analytics, and configuration
- CORS configuration for GitHub Pages frontend

The **frontend** is deployed separately on GitHub Pages at **https://bazzai.github.io**.

## Technology Stack

- **Node.js 22** - Runtime
- **Express 4** - Web framework
- **tRPC 11** - Type-safe API
- **Drizzle ORM** - Database access
- **MySQL** - Database
- **TypeScript** - Type safety

## Deployment to Railway

### Prerequisites
- Railway account
- GitHub repository (this one)
- MySQL database (Railway will create this)

### Step 1: Create Railway Project

1. Go to https://railway.app/dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub"**
4. Select this repository: **`Ocholar/bazz-ai-agentic-team`** (backend version)
5. Click **"Deploy"**

### Step 2: Add MySQL Database

1. In your Railway project, click **"Add Service"**
2. Select **"Database"** → **"MySQL"**
3. Railway automatically sets `DATABASE_URL` environment variable

### Step 3: Configure Environment Variables

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

# Database (Auto-set by Railway)
# DATABASE_URL=mysql://user:password@host:port/database
```

**Generate JWT_SECRET:**
```bash
openssl rand -base64 32
```

### Step 4: Deploy

Railway automatically builds and deploys when you push to GitHub. Wait 5-10 minutes for deployment to complete.

Once deployed, you'll get a URL like:
```
https://bazz-ai-agentic-team-production-xxxx.up.railway.app
```

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/oauth/callback` | POST | Manus OAuth callback |
| `/api/trpc/leads.list` | POST | Get all leads |
| `/api/trpc/leads.create` | POST | Create new lead |
| `/api/trpc/leads.update` | POST | Update lead |
| `/api/trpc/leads.delete` | POST | Delete lead |
| `/api/trpc/submissions.list` | POST | Get all submissions |
| `/api/trpc/submissions.create` | POST | Create submission |
| `/api/trpc/analytics.getLatest` | POST | Get latest analytics |
| `/api/trpc/analytics.create` | POST | Create analytics record |
| `/api/trpc/config.get` | POST | Get configuration |
| `/api/trpc/config.update` | POST | Update configuration |

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (local development)
- `http://localhost:5173` (Vite dev server)
- `https://bazzai.github.io` (GitHub Pages frontend)
- `https://bazz-ai-agentic-team-production-*.up.railway.app` (Railway deployments)

## Database Schema

### users
- id (INT, PK)
- openId (VARCHAR, UNIQUE)
- name (TEXT)
- email (VARCHAR)
- loginMethod (VARCHAR)
- role (ENUM: user, admin)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)
- lastSignedIn (TIMESTAMP)

### leads
- id (INT, PK)
- customerName (VARCHAR)
- phone (VARCHAR)
- email (VARCHAR)
- source (VARCHAR)
- tag (VARCHAR)
- status (ENUM: new, qualified, rejected)
- preferredPackage (VARCHAR)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### submissions
- id (INT, PK)
- leadId (INT, FK)
- status (ENUM: pending, success, failed)
- responseCode (VARCHAR)
- retryCount (INT)
- errorMessage (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

### analytics
- id (INT, PK)
- date (DATE)
- monthlyGrossAdds (INT)
- totalLeads (INT)
- conversionRate (DECIMAL)
- packageMix (DECIMAL)
- avgCommission (DECIMAL)
- submissionSuccessRate (DECIMAL)
- createdAt (TIMESTAMP)

### config
- id (INT, PK)
- key (VARCHAR, UNIQUE)
- value (TEXT)
- createdAt (TIMESTAMP)
- updatedAt (TIMESTAMP)

## Development

### Prerequisites
- Node.js 22+
- pnpm 8+
- MySQL 8+

### Setup

```bash
# Install dependencies
pnpm install

# Run database migrations
pnpm db:push

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Testing

All tRPC procedures are tested with Vitest:

```bash
pnpm test
```

Tests cover:
- Authentication (logout)
- Leads CRUD operations
- Submissions tracking
- Analytics data
- Configuration management

## Troubleshooting

### Build Fails

**Error**: `DATABASE_URL not set`
- **Solution**: Make sure MySQL service is added to Railway project

**Error**: `pnpm: command not found`
- **Solution**: Add `NIXPACKS_PKGS=pnpm` to environment variables

### Application Won't Start

**Error**: `Port already in use`
- **Solution**: The app tries ports 3000-3019. Check what's using port 3000.

**Error**: `OAuth callback failing`
- **Solution**: Verify `VITE_OAUTH_PORTAL_URL` and `OAUTH_SERVER_URL` are correct

### Frontend Can't Connect

**Error**: `CORS error when calling API`
- **Solution**: Ensure frontend URL is in CORS allowlist in `server/_core/index.ts`

## Deployment Checklist

- [ ] Railway project created
- [ ] GitHub repository connected
- [ ] MySQL database service added
- [ ] Environment variables configured
- [ ] Build completed successfully
- [ ] API accessible at deployed URL
- [ ] Database migrations completed
- [ ] Frontend can connect to backend API

## Performance

- **Build time**: ~2-3 minutes
- **Startup time**: ~10 seconds
- **Database queries**: <100ms average
- **API response time**: <200ms average

## Support

For issues or questions, refer to:
- Main project: https://github.com/Ocholar/bazz-ai-agentic-team
- Frontend: https://github.com/Ocholar/bazzai
