# n8n Lead Generation & Submission Setup Guide

## Overview
This guide covers the setup for both lead generation and automated form submission workflows.

## Backend Base URL
```
https://bazz-ai-agentic-team-production-3203.up.railway.app
```

## Workflow 01: Lead Generation
**Endpoint**: `POST /api/leads/create`

**Payload**:
```json
{
  "source": "linkedin",
  "tag": "high_value",
  "customerName": "John Doe",
  "phone": "254712345678",
  "email": "john@example.com"
}
```

## Workflow 03: Form Submission Agent
This workflow automates the submission of qualified leads to the Airtel Microsoft Form.

### 1. Fetch Qualified Leads
**Node**: HTTP Request
**Method**: GET
**URL**: `https://bazz-ai-agentic-team-production-3203.up.railway.app/api/leads?status=qualified`

### 2. Submit to Form
**Node**: HTTP Request
**Method**: POST
**URL**: `https://bazz-ai-agentic-team-production-3203.up.railway.app/api/submit-to-airtel-form`

### 3. Record Submission
**Node**: HTTP Request
**Method**: POST
**URL**: `https://bazz-ai-agentic-team-production-3203.up.railway.app/api/submissions/create`

### 4. Update Lead Status
**Node**: HTTP Request
**Method**: POST
**URL**: `https://bazz-ai-agentic-team-production-3203.up.railway.app/api/leads/update`
**Body**:
```json
{
  "id": {{ $json.leadId }},
  "status": "submitted"
}
```

---

**Last Updated**: 2025-12-23
