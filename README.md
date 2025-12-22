# BAZZ AI Frontend - GitHub Pages

This is the frontend application for the BAZZ AI Agentic Team, deployed on GitHub Pages at **https://bazzai.github.io**.

## Architecture

This is a **frontend-only repository** that contains:
- React 19 application with Tailwind CSS 4
- Dashboard UI with 5 pages (Dashboard, Leads, Submissions, Analytics, Configuration)
- CSV export functionality
- Manus OAuth integration
- tRPC client for API communication

The **backend API** is deployed separately on Railway and communicates with this frontend via REST/tRPC.

## Development

### Prerequisites
- Node.js 22+
- pnpm 8+

### Setup

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deployment

This repository is automatically deployed to GitHub Pages when you push to the `main` branch.

### GitHub Actions Workflow

The `.github/workflows/deploy.yml` file automatically:
1. Installs dependencies
2. Builds the React application
3. Deploys to GitHub Pages

### Environment Variables

Set the following secrets in your GitHub repository settings:

- `VITE_APP_ID` - Manus OAuth application ID
- `VITE_OAUTH_PORTAL_URL` - Manus OAuth portal URL
- `VITE_FRONTEND_FORGE_API_URL` - Manus API URL
- `VITE_FRONTEND_FORGE_API_KEY` - Manus API key
- `VITE_ANALYTICS_ENDPOINT` - Analytics endpoint (optional)
- `VITE_ANALYTICS_WEBSITE_ID` - Analytics website ID (optional)

## Backend API

The frontend communicates with the backend API running on Railway:

**API Base URL**: `https://bazz-ai-agentic-team-production-xxxx.up.railway.app/api/trpc`

The backend API provides:
- User authentication and session management
- Lead management (CRUD operations)
- Submission tracking
- Analytics and performance metrics
- Configuration management

## Features

### Dashboard Page
- Real-time KPI metrics
- Color-coded status indicators (green, yellow, red)
- System status monitoring
- Performance targets

### Leads Page
- Lead management table with filtering
- Search functionality
- CSV export
- Lead details modal
- Status and tag management

### Submissions Page
- Submission tracking table
- Success/failure indicators
- Retry count display
- CSV export
- Detailed submission view

### Analytics Page
- 30-day trends
- Conversion funnel
- Package mix analysis
- Source performance
- Performance charts

### Configuration Page
- System settings management
- Lead generation allocation
- Upselling aggressiveness
- Retry logic configuration
- Real-time configuration updates

## CSV Export

Both Leads and Submissions pages include CSV export functionality:

1. Click **"Export to CSV"** button
2. CSV file downloads with current date in filename
3. Open in Excel, Google Sheets, or any spreadsheet application

CSV data includes proper escaping for:
- Commas
- Quotes
- Newlines
- Special characters

## Troubleshooting

### Build Fails

**Error**: `Cannot find module '@'`
- **Solution**: Check that `vite.config.ts` has correct path aliases

**Error**: `VITE_APP_ID is not defined`
- **Solution**: Set environment variables in GitHub repository settings

### Deployment Fails

**Error**: `GitHub Pages deployment failed`
- **Solution**: Check GitHub Actions workflow in `.github/workflows/deploy.yml`
- Verify repository settings: Settings → Pages → Source: GitHub Actions

### Frontend Can't Connect to Backend

**Error**: `CORS error when calling API`
- **Solution**: Ensure backend on Railway has CORS enabled for `https://bazzai.github.io`
- Check backend environment variables

## Project Structure

```
src/
  pages/          # Page components
  components/     # Reusable UI components
  lib/            # Utilities and helpers
  contexts/       # React contexts
  hooks/          # Custom hooks
  App.tsx         # Main app component
  main.tsx        # Entry point
  index.css       # Global styles
public/           # Static assets
.github/
  workflows/      # GitHub Actions workflows
```

## Technologies

- **React 19** - UI framework
- **Tailwind CSS 4** - Styling
- **tRPC** - Type-safe API client
- **Wouter** - Lightweight routing
- **Vite** - Build tool
- **TypeScript** - Type safety

## License

Private - BAZZ AI Agentic Team

## Support

For issues or questions, refer to the main project documentation at:
https://github.com/Ocholar/bazz-ai-agentic-team
