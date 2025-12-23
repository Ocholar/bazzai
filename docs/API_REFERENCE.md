# BAZZ AI Backend - API Quick Reference

## Base URL
```
https://bazz-ai-agentic-team-production-3203.up.railway.app
```

## Lead Management Endpoints (for n8n)

### 1. Fetch Leads
**Endpoint**: `GET /api/leads`
**Query Parameters**:
- `status` (optional): Filter by status (e.g., `qualified`, `new`)

**Example**: `GET /api/leads?status=qualified`

---

### 2. Create Lead
**Endpoint**: `POST /api/leads/create`
**Headers**: `Content-Type: application/json`
**Request Body**:
```json
{
  "source": "string (required)",
  "tag": "string (required: 'high_value' or 'high_volume')",
  "customerName": "string (optional)",
  "phone": "string (required)",
  "email": "string (optional)",
  "connectionType": "string (optional)",
  "installationTown": "string (optional)",
  "deliveryLocation": "string (optional)",
  "status": "string (optional, default: 'new')"
}
```

---

### 3. Update Lead
**Endpoint**: `POST /api/leads/update`
**Headers**: `Content-Type: application/json`
**Request Body**:
```json
{
  "id": number (required),
  "status": "string (optional)",
  "customerName": "string (optional)",
  "phone": "string (optional)",
  "email": "string (optional)",
  "preferredPackage": "string (optional)",
  "installationTown": "string (optional)",
  "deliveryLocation": "string (optional)"
}
```

---

### 4. Create Submission Record
**Endpoint**: `POST /api/submissions/create`
**Headers**: `Content-Type: application/json`
**Request Body**:
```json
{
  "leadId": number (required),
  "status": "pending|success|failed|retry",
  "submissionPayload": object (optional),
  "responseCode": number (optional),
  "responseBody": "string (optional)",
  "errorMessage": "string (optional)"
}
```

---

### 5. Submit to Airtel Form (Browser Automation)
**Endpoint**: `POST /api/submit-to-airtel-form`
**Headers**: `Content-Type: application/json`
**Request Body**:
```json
{
  "customerName": "string",
  "customerAirtelNumber": "string",
  "customerAlternateNumber": "string",
  "customerEmail": "string",
  "preferredPackage": "string",
  "installationTown": "string",
  "deliveryLocation": "string",
  "connectionType": "string",
  "units": "string"
}
```

---

## tRPC API
**Endpoint**: `POST /api/trpc/<procedure>`
**Procedures**:
- `leads.getAll`
- `leads.create`
- `leads.update`
- `leads.submitToAirtel`
- `submissions.getAll`
- `submissions.create`
- `analytics.getLatest`
- `config.getAll`
- `config.set`

---

## Database Schema (MySQL)

### Leads Table
- `id`: INT AUTO_INCREMENT
- `customerName`: VARCHAR(255)
- `phone`: VARCHAR(20)
- `email`: VARCHAR(320)
- `status`: ENUM('new', 'contacted', 'qualified', 'submitted', 'installed', 'failed')
- `preferredPackage`: VARCHAR(50)
- `installationTown`: TEXT
- `deliveryLocation`: TEXT
- `source`: VARCHAR(255)
- `tag`: VARCHAR(255)

---

**Last Updated**: 2025-12-23
