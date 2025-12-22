# n8n Workflows - BAZZ AI Agentic Team

This directory contains the four autonomous workflows that power the BAZZ AI Agentic Team system.

## Workflows Overview

### 1. Lead Generation Agent (`01_lead_generation_agent.json`)

**Purpose**: Acquire 600+ leads per month from zero-cost channels

**Trigger**: Every 6 hours (4 times daily)

**Workflow**:
1. Fetch leads from multiple sources in parallel:
   - LinkedIn (business owners, IT managers)
   - Google Maps (established businesses)
   - WhatsApp Business API (community groups)
   - Facebook (local business groups, marketplace)

2. Tag leads based on source:
   - High-Value: LinkedIn, Google Maps (60% allocation)
   - High-Volume: WhatsApp, Facebook (40% allocation)

3. Deduplication:
   - Check database for existing leads by phone/email
   - Skip duplicates

4. Store leads:
   - POST to dashboard API (`/api/trpc/leads.create`)
   - Set status: "new"

**Target Output**: 20+ leads per run → 80+ leads/day → 600+ leads/month

**Configuration**:
- Lead source URLs (LinkedIn, Google Maps, etc.)
- API credentials for WhatsApp/Facebook
- Dashboard API endpoint

---

### 2. Lead Qualification & Upselling Agent (`02_lead_qualification_agent.json`)

**Purpose**: Qualify leads and aggressively upsell the 30Mbps package

**Trigger**: Every 2 hours (12 times daily)

**Workflow**:
1. Fetch new leads:
   - GET from dashboard API (`/api/trpc/leads.getByStatus?status=new`)

2. For each lead:
   - Send WhatsApp/SMS message via WhatsApp Business API
   - Initiate conversational engagement

3. LLM-powered qualification:
   - Use Manus built-in LLM API
   - Collect required data:
     - Customer Name
     - Airtel Number
     - Alternative Number
     - Email Address
     - Installation Town
     - Delivery Location
     - Preferred Installation Date & Time
   - **Aggressively upsell 30Mbps package**:
     - Emphasize speed (30Mbps = 4K streaming, video calls, gaming)
     - Frame 15Mbps as "basic" option for light users only
     - Offer limited-time incentives
     - Use social proof ("90% of business customers choose 30Mbps")

4. Update lead status:
   - When all data collected: status = "qualified"
   - Store conversation history in database

**Target Output**: 50+ qualified leads/day → 350+ qualified leads/week

**LLM Prompt Template**:
```
You are a sales agent for Airtel Kenya 5G ODU. Your goal is to:
1. Collect: Customer Name, Airtel Number, Alternative Number, Email, Installation Town, Delivery Location, Preferred Date/Time
2. AGGRESSIVELY upsell the 30Mbps package (KES 2,999/month) over 15Mbps (KES 1,999/month)
3. Emphasize: Speed (30Mbps = 4K streaming, video calls, gaming; 15Mbps = basic browsing), reliability, future-proofing
4. Frame 15Mbps as "basic" option for light users only
5. Be conversational, friendly, but persistent
6. Offer limited-time incentives for 30Mbps
7. Use social proof: "90% of our business customers choose 30Mbps"
```

**Configuration**:
- WhatsApp Business API token
- Manus LLM API key
- Dashboard API endpoint
- LLM prompt customization

---

### 3. Form Submission & Tracking Agent (`03_form_submission_agent.json`)

**Purpose**: Auto-submit qualified leads to Airtel Installation Request Form

**Trigger**: Every 4 hours (6 times daily)

**Workflow**:
1. Fetch qualified leads:
   - GET from dashboard API (`/api/trpc/leads.getByStatus?status=qualified`)

2. For each lead:
   - Construct Microsoft Forms submission payload:
     ```json
     {
       "Agent Type": "Enterprise",
       "Enterprise CP": "BAZZTECH NETWORKS",
       "Agent Name": "Reagan Ochola",
       "Agent Mobile": "254781751937",
       "Type of Lead": "Confirmed",
       "Type of Connection": "SmartConnect (5G ODU)",
       "Customer Name": "{lead.customerName}",
       "Airtel Number": "{lead.phone}",
       "Email": "{lead.email}",
       "Package": "{lead.preferredPackage}",
       "Installation Town": "{lead.installationTown}",
       "Delivery Location": "{lead.deliveryLocation}",
       "Preferred Date": "{lead.preferredDate}",
       "Preferred Time": "{lead.preferredTime}"
     }
     ```

3. Submit to Airtel:
   - HTTP POST to Microsoft Forms API endpoint
   - Track response code and body

4. Handle responses:
   - Success (200-299): Update lead status to "submitted"
   - Failure: Implement retry logic

5. Retry logic:
   - Max 3 attempts with exponential backoff
   - Log errors to database
   - Update submission record with error details

6. Record submission:
   - POST to dashboard API (`/api/trpc/submissions.create`)
   - Store payload, response, and status

**Target Output**: 100% of qualified leads submitted with >97% success rate

**Configuration**:
- Microsoft Forms API endpoint
- Dashboard API endpoint
- Retry parameters (max attempts, backoff strategy)

---

### 4. Weekly Optimization & Reporting Agent (`04_weekly_optimization_agent.json`)

**Purpose**: Analyze performance and optimize workflows

**Trigger**: Every Monday at 9 AM

**Workflow**:
1. Fetch analytics:
   - GET from dashboard API (`/api/trpc/analytics.getByDateRange`)
   - Retrieve last 7 days of performance data

2. Calculate KPIs:
   - Total Gross Adds (target: 100+/week)
   - Conversion Rate (Lead → GA)
   - 30Mbps Package Mix (target: >70%)
   - Avg Commission per GA
   - Submission Success Rate (target: >97%)

3. Identify bottlenecks:
   - **Low GAs**: Increase lead gen frequency, expand to new channels
   - **Low Conversion Rate**: Improve qualification script, add urgency triggers
   - **Low 30Mbps Mix**: Strengthen upselling tactics, add limited-time offers
   - **Low Submission Success Rate**: Debug form submission logic, improve validation

4. Generate report:
   - Use LLM to create natural language summary
   - Include actionable insights
   - Recommend workflow adjustments

5. Send notification:
   - POST to dashboard API (`/api/trpc/system.notifyOwner`)
   - Deliver report to project owner

**Optimization Actions**:
| Bottleneck | Automatic Action |
|-----------|------------------|
| GAs < 100/week | Increase lead gen to every 4 hours, expand channels |
| Conversion < 20% | A/B test qualification prompts, add urgency |
| 30Mbps Mix < 70% | Increase price gap emphasis, add limited-time offers |
| Submission Success < 97% | Add retry logic, improve payload validation |

**Configuration**:
- Dashboard API endpoint
- Manus LLM API key
- Notification settings

---

## Deployment Instructions

### Step 1: Access n8n Dashboard

1. Navigate to your n8n instance
2. Click "Workflows" in the sidebar
3. Click "Import" or "Create New Workflow"

### Step 2: Import Workflows

For each workflow JSON file:

1. Click "Import from file"
2. Select the workflow JSON file
3. Review the workflow structure
4. Click "Import"

### Step 3: Configure Credentials

Before activating workflows, configure all required credentials:

#### Global Credentials
- **Manus LLM API**:
  - Type: HTTP Request
  - Base URL: `https://api.manus.im`
  - Auth: Bearer token (BUILT_IN_FORGE_API_KEY)

- **Dashboard API**:
  - Type: HTTP Request
  - Base URL: `https://your-project.up.railway.app/api/trpc`
  - Auth: None (public endpoints)

- **WhatsApp Business API**:
  - Type: HTTP Request
  - Base URL: `https://graph.instagram.com/v18.0`
  - Auth: Bearer token (WhatsApp Business API token)

#### Workflow-Specific Credentials
- **Lead Generation**: LinkedIn API, Google Maps API, Facebook Graph API
- **Form Submission**: Microsoft Forms API endpoint

### Step 4: Test Workflows

1. **Lead Generation**:
   - Click "Execute Workflow"
   - Verify leads are created in dashboard
   - Check database for new leads

2. **Lead Qualification**:
   - Manually create a test lead with status "new"
   - Execute workflow
   - Verify WhatsApp message sent (if configured)
   - Check lead status updated to "qualified"

3. **Form Submission**:
   - Create a test lead with status "qualified"
   - Execute workflow
   - Verify submission record created
   - Check Airtel form received data

4. **Weekly Optimization**:
   - Execute workflow manually
   - Verify report generated
   - Check notification sent to owner

### Step 5: Activate Workflows

Once testing is complete:

1. Click the workflow
2. Click "Activate" (toggle switch)
3. Verify schedule is set correctly
4. Monitor workflow executions

---

## Monitoring and Troubleshooting

### View Workflow Executions

1. Click "Executions" tab in workflow
2. Review execution history
3. Click execution to view details

### Common Issues

**Issue**: Workflow fails to connect to dashboard API
- **Solution**: Verify API endpoint URL is correct
- **Solution**: Check network connectivity
- **Solution**: Verify API credentials

**Issue**: Leads not being created
- **Solution**: Check lead source APIs are accessible
- **Solution**: Verify deduplication logic
- **Solution**: Check database connection

**Issue**: WhatsApp messages not sending
- **Solution**: Verify WhatsApp Business API token is valid
- **Solution**: Check phone number format
- **Solution**: Verify message content complies with WhatsApp policies

**Issue**: Form submissions failing
- **Solution**: Verify Microsoft Forms endpoint is correct
- **Solution**: Check payload structure matches form fields
- **Solution**: Review error logs in submissions table

### Performance Optimization

- **Reduce lead gen frequency** if leads are not being qualified fast enough
- **Increase qualification frequency** if leads are piling up
- **Adjust retry logic** based on form submission success rate
- **Monitor API rate limits** for all external services

---

## API Integration

### Dashboard API Endpoints

All workflows communicate with the dashboard via tRPC endpoints:

```
POST /api/trpc/leads.create
POST /api/trpc/leads.getByStatus
POST /api/trpc/submissions.create
POST /api/trpc/analytics.getByDateRange
POST /api/trpc/config.get
POST /api/trpc/system.notifyOwner
```

### Request/Response Format

All requests use tRPC JSON-RPC format:

```json
{
  "jsonrpc": "2.0",
  "method": "leads.create",
  "params": {
    "input": {
      "customerName": "John Doe",
      "phone": "+254712345678",
      "source": "linkedin",
      "tag": "high_value"
    }
  },
  "id": 1
}
```

---

## Performance Targets

| Metric | Target | Frequency |
|--------|--------|-----------|
| Leads Generated | 600+/month | Every 6 hours |
| Leads Qualified | 350+/week | Every 2 hours |
| Forms Submitted | 100%/qualified | Every 4 hours |
| Gross Adds | 400+/month | Tracked daily |
| 30Mbps Package Mix | 70%+ | Analyzed weekly |
| Submission Success Rate | >97% | Analyzed weekly |

---

## Support

For issues or questions about workflows:
1. Check the troubleshooting guide above
2. Review n8n logs in the Executions tab
3. Check database error records
4. Contact Manus support for API-related issues

---

**Last Updated**: November 25, 2025
**Version**: 1.0
**Author**: Manus AI
