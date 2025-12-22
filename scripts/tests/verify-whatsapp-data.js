/**
 * WhatsApp Data Verification Script (Direct DB Version)
 * Checks database to verify conversation data is being saved correctly
 */

import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkLeadData(phone = '254720821051') {
    console.log(`\n📊 Checking lead data for: ${phone}`);
    console.log(`${'='.repeat(60)}\n`);

    const dbUrl = process.env.DATABASE_URL;
    if (!dbUrl) {
        console.error('❌ DATABASE_URL is missing in .env');
        return;
    }

    try {
        const connection = await mysql.createConnection(dbUrl);
        const [rows] = await connection.execute('SELECT * FROM leads WHERE phone = ?', [phone]);
        await connection.end();

        const leadData = rows[0];

        if (!leadData) {
            console.log('❌ Lead not found!');
            return null;
        }

        console.log('✅ Lead Found!\n');
        console.log(`👤 Customer: ${leadData.customerName || 'N/A'}`);
        console.log(`📱 Phone: ${leadData.phone}`);
        console.log(`📊 Status: ${leadData.status}`);
        console.log(`📦 Package: ${leadData.preferredPackage || 'Not set'}`);
        console.log(`📍 Location: ${leadData.deliveryLocation || 'Not set'}`);
        console.log(`📅 Date: ${leadData.preferredDate ? new Date(leadData.preferredDate).toISOString().split('T')[0] : 'Not set'}`);
        console.log(`🕐 Time: ${leadData.preferredTime || 'Not set'}`);

        let conversationHistory = [];
        if (leadData.conversationHistory) {
            try {
                conversationHistory = typeof leadData.conversationHistory === 'string'
                    ? JSON.parse(leadData.conversationHistory)
                    : leadData.conversationHistory;
            } catch (e) {
                console.log('⚠️  Could not parse conversation history');
            }
        }

        console.log(`\n💬 Conversation History (${conversationHistory.length} messages):`);
        console.log(`${'─'.repeat(60)}`);

        conversationHistory.forEach((msg, i) => {
            const icon = msg.role === 'user' ? '👤' : '🤖';
            const timestamp = new Date(msg.timestamp).toLocaleTimeString();
            console.log(`${icon} [${timestamp}] ${msg.role.toUpperCase()}: ${msg.message}`);
        });

        console.log(`${'─'.repeat(60)}\n`);

        const isQualified = leadData.status === 'qualified';
        const isRejected = leadData.status === 'failed';

        if (isQualified) {
            console.log('🎉 QUALIFIED - All required info collected!');
        } else if (isRejected) {
            console.log('❌ REJECTED - Lead declined offer');
        } else {
            console.log('⏳ IN PROGRESS - Awaiting more information');
        }

        console.log('\n📋 Data Completeness:');
        const checks = [
            { field: 'Package', value: leadData.preferredPackage, required: true },
            { field: 'Location', value: leadData.deliveryLocation, required: true },
            { field: 'Date', value: leadData.preferredDate, required: true },
            { field: 'Time', value: leadData.preferredTime, required: true },
        ];

        checks.forEach(check => {
            const status = check.value ? '✅' : (check.required ? '❌' : '⚠️');
            console.log(`  ${status} ${check.field}: ${check.value || 'Missing'}`);
        });

        return leadData;
    } catch (error) {
        console.error('❌ Error fetching lead data:', error.message);
        return null;
    }
}

const args = process.argv.slice(2);
const phone = args[0] || '254720821051';
checkLeadData(phone).catch(console.error);
