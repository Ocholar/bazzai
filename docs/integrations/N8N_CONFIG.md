# n8n Environment Variables Configuration

Copy these exact values to your n8n instance environment variables:

```bash
DASHBOARD_API_URL=https://bazz-ai-agentic-team-production-3203.up.railway.app/api/trpc
MANUS_LLM_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d
MANUS_LLM_API_URL=https://api.manus.im
```

## How to Set in n8n

### Cloud n8n:
1. Go to Settings → Environment
2. Add each variable above
3. Save

### Self-Hosted n8n (Docker):
Add to your `.env` file or Docker environment:
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -e DASHBOARD_API_URL=https://bazz-ai-agentic-team-production-3203.up.railway.app/api/trpc \
  -e MANUS_LLM_API_KEY=sk-e4qRXk_LfVceXiVgTRO4CTmELB_sBOSaW7sGJwN2bizuOgIUuvWQXpzsoV_lbCZNpi0HFrxu19tvwdzwK3jIMQOGVc4d \
  -e MANUS_LLM_API_URL=https://api.manus.im \
  n8nio/n8n
```

## Workflows to Import

All workflows are in: `c:\Antigravity\workflows\`

1. **02 - Lead Qualification Agent (Conversational) (1).json** (Primary)
2. **03_form_submission_agent.json**
3. **04_weekly_optimization_agent.json**
4. **05_whatsapp_auto_responder.json**

*Note: `01_lead_generation_agent.json` depends on external APIs and may be left inactive if not needed.*
