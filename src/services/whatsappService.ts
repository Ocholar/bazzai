import db from '../db';
import whatsappClient from '../whatsappClient';

// ...existing code...

async function sendTemplateMessage(leadId: string, templateName: string, params: any) {
  // Send WhatsApp message
  await whatsappClient.sendTemplate(/* ...existing params... */);
  
  // Update lead with last template sent
  await db.query(
    'UPDATE leads SET lastTemplateSent = ?, lastTemplateSentAt = NOW() WHERE id = ?',
    [templateName, leadId]
  );
  
  // ...existing code...
}

// ...existing code...