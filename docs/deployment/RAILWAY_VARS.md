# Railway Environment Variables Configuration

Copy and paste these exact values into your Railway project's Variables tab:

## Required Variables

JWT_SECRET```bash
=Xy9zPq2L4mN8vK1jR5tW7xZ0cQ3bH6nJ9kM2pL5vR8t
VITE_APP_ID=310519663224404714
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://login.manus.im
OWNER_OPEN_ID=254781751937
OWNER_NAME=Bazztech Networks
BUILT_IN_FORGE_API_URL=https://api.manus.im
BUILT_IN_FORGE_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
VITE_FRONTEND_FORGE_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
VITE_FRONTEND_FORGE_API_URL=https://api.manus.im
NODE_ENV=production
```

## Optional Variables

```bash
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
VITE_APP_TITLE=BAZZ AI Agentic Team
VITE_APP_LOGO=/logo.svg
```

## How to Set These in Railway:

1. Open your Railway project "motivated-ambition"
2. Click on your service (the one deployed from GitHub)
3. Go to the "Variables" tab
4. Click "+ Variable" or "Raw Editor"
5. Paste the variables above
6. Railway will automatically redeploy

## Note:
- `DATABASE_URL` will be automatically set by Railway when you add the MySQL service
- Do NOT manually add `DATABASE_URL`
