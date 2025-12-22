# BAZZ AI Backend - API Quick Reference

## Lead Creation Endpoint (for n8n)

### Endpoint Details
```
POST https://bazz-ai-agentic-team-production.up.railway.app/api/leads/create
```

### Headers
```
Content-Type: application/json
```

### Request Body
```json
{
  "source": "string (required)",
  "tag": "string (required: 'high_value' or 'high_volume')",
  "customerName": "string (optional)",
  "phone": "string (required)",
  "email": "string (optional)"
}
```

### Field Constraints
- **source**: Any string (e.g., "linkedin", "google_maps", "whatsapp", "facebook", "website")
- **tag**: Must be either `"high_value"` or `"high_volume"`
- **phone**: Required, max 20 characters
- **email**: Optional, max 320 characters
- **customerName**: Optional

### Response (Success)
```json
{
  "success": true,
  "leadId": 123
}
```

### Response (Error)
```json
{
  "success": false,
  "error": "Error message here"
}
```

### Example cURL Request
```bash
curl -X POST https://bazz-ai-agentic-team-production.up.railway.app/api/leads/create \
  -H "Content-Type: application/json" \
  -d '{
    "source": "linkedin",
    "tag": "high_value",
    "customerName": "John Doe",
    "phone": "0712345678",
    "email": "john@example.com"
  }'
```

### Example n8n HTTP Request Node Configuration
```json
{
  "url": "https://bazz-ai-agentic-team-production.up.railway.app/api/leads/create",
  "method": "POST",
  "sendHeaders": true,
  "headerParameters": {
    "parameters": [
      {
        "name": "Content-Type",
        "value": "application/json"
      }
    ]
  },
  "sendBody": true,
  "specifyBody": "json",
  "jsonBody": {
    "source": "{{ $json.source }}",
    "tag": "{{ $json.tag }}",
    "customerName": "{{ $json.name }}",
    "phone": "{{ $json.phone }}",
    "email": "{{ $json.email }}"
  }
}
  }
}
```

### Store Lead Endpoint (Alternative for n8n)
This endpoint is designed to be flexible and accept various field names for lead data.

```
POST /api/store-lead
```

### Request Body
Accepts a JSON object with flexible field names.
- `phone` / `phoneNumber` / `mobile` / `customerAirtelNumber` (Required)
- `customerName` / `name` / `fullName`
- `email` / `customerEmail`
- `source` (default: 'n8n-store-lead')
- `tag` ('high_value' or 'high_volume', default: 'high_volume')
- `status` (default: 'new')
- `preferredPackage`
- `installationTown`
- `deliveryLocation`
- `preferredDate`
- `preferredTime`
- `conversationHistory`

### Response
```json
{
  "success": true,
  "leadId": 123
}
```

## Other Available Endpoints

### OAuth Callback
```
GET /api/oauth/callback?code=<github_code>
```

### tRPC API
```
POST /api/trpc/<procedure>
```

Available procedures:
- `leads.getAll`
- `leads.create`
- `leads.updateStatus`
- `submissions.getAll`
- `submissions.create`
- `analytics.getLatest`
- `config.get`
- `config.set`

### Health Check
```
GET /
```
Returns:
```json
{
  "status": "online",
  "service": "BAZZ AI Backend",
  "version": "1.0.0"
}
```

## Environment Variables (Railway)

Required:
- `DATABASE_URL` or `MYSQL_URL`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `GITHUB_OAUTH_REDIRECT_URI`
- `JWT_SECRET`

Optional:
- `NODE_ENV` (default: "production")
- `PORT` (default: 8080)

## Database Schema

### Leads Table
```sql
CREATE TABLE leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customerName TEXT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(320) NULL,
  source VARCHAR(50) NOT NULL,
  tag ENUM('high_value', 'high_volume') NOT NULL,
  status ENUM('new', 'contacted', 'qualified', 'submitted', 'installed', 'failed') NOT NULL DEFAULT 'new',
  preferredPackage ENUM('15mbps', '30mbps', 'unspecified') DEFAULT 'unspecified',
  installationTown TEXT NULL,
  deliveryLocation TEXT NULL,
  preferredDate TIMESTAMP NULL,
  preferredTime VARCHAR(20) NULL,
  conversationHistory JSON NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Deployment

### Railway
- **Service**: bazz-ai-agentic-team
- **URL**: https://bazz-ai-agentic-team-production.up.railway.app
- **Auto-deploy**: Enabled on `main` branch push

### GitHub Repository
- **Backend**: https://github.com/Ocholar/bazz-ai-agentic-team
- **Frontend**: https://github.com/Ocholar/bazzai

---

**Last Updated**: 2025-11-29
