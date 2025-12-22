import { Router } from 'express';
import * as db from './db';
import { submitToAirtelForm } from './form-filler';

export const apiRouter = Router();

// Simple REST endpoint for n8n lead creation
apiRouter.post('/leads/create', async (req, res) => {
  try {
    const { customerName, name, phone, email, source, tag, status } = req.body;

    // Use either customerName or name field
    const finalName = customerName || name;

    // Normalize phone number
    let normalizedPhone = phone.replace(/[\s\-\+]/g, '');
    if (normalizedPhone.startsWith('0')) {
      normalizedPhone = '254' + normalizedPhone.slice(1);
    }

    const result = await db.createLead({
      customerName: finalName,
      phone: normalizedPhone,
      email: email || undefined,
      source,
      tag: tag as 'high_value' | 'high_volume',
      status: status || 'new'
    });

    res.json({
      success: true,
      leadId: result[0]?.insertId || result.insertId || null
    });
  } catch (error: any) {
    console.error('Error creating lead:', error);
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

// Get leads by status
apiRouter.get('/leads', async (req, res) => {
  try {
    const { status } = req.query;

    if (status) {
      const leads = await db.getLeadsByStatus(status as string);
      res.json(leads);
    } else {
      const leads = await db.getAllLeads();
      res.json(leads);
    }
  } catch (error: any) {
    console.error('Error fetching leads:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update lead
apiRouter.post('/leads/update', async (req, res) => {
  try {
    const { id, status, ...updates } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID is required'
      });
    }

    if (status) {
      await db.updateLeadStatus(id, status);
    }

    if (Object.keys(updates).length > 0) {
      await db.updateLeadWithConversation(id, updates);
    }

    res.json({ success: true });
  } catch (error: any) {
    console.error('Error updating lead:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Submit to Airtel form using browser automation
apiRouter.post('/submit-to-airtel-form', async (req, res) => {
  try {
    const leadData = req.body;

    console.log('Submitting lead to Airtel form:', leadData.customerName);

    const result = await submitToAirtelForm(leadData);

    if (result.success) {
      res.json({
        success: true,
        statusCode: 200,
        body: { message: 'Form submitted successfully' }
      });
    } else {
      res.status(500).json({
        success: false,
        statusCode: 500,
        error: result.error,
        body: { message: result.error }
      });
    }
  } catch (error: any) {
    console.error('Error in Airtel form submission:', error);
    res.status(500).json({
      success: false,
      statusCode: 500,
      error: error.message,
      body: { message: error.message }
    });
  }
});

// Create submission record
apiRouter.post('/submissions/create', async (req, res) => {
  try {
    const { leadId, status, responseCode, responseBody, errorMessage, submittedAt } = req.body;

    if (!leadId) {
      return res.status(400).json({
        success: false,
        error: 'Lead ID is required'
      });
    }

    const result = await db.createSubmission({
      leadId,
      status: status as 'success' | 'failed',
      responseCode,
      responseBody,
      errorMessage,
      submittedAt: submittedAt ? new Date(submittedAt) : new Date()
    });

    res.json({
      success: true,
      submissionId: result[0]?.insertId || result.insertId || null
    });
  } catch (error: any) {
    console.error('Error creating submission:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Get all submissions
apiRouter.get('/submissions', async (req, res) => {
  try {
    const submissions = await db.getAllSubmissions();
    res.json(submissions);
  } catch (error: any) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});