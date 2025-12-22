// Complete End-to-End Testing Script for WhatsApp AI Agent
// Run this after Railway deployment is fixed and n8n is configured

import axios from 'axios';
import mysql from 'mysql2/promise';

const CONFIG = {
    // Railway Backend
    backendUrl: 'https://bazz-ai-agentic-team-production-3203.up.railway.app',

    // WhatsApp
    whatsappPhoneNumberId: '867414716459504',
    whatsappAccessToken: 'EAAblTVbhiH0BQCr3v1f5qWDl6YZAqNlh3UFpKHVwoPPZB16NbXsBwUqGMU8SssDF22aSFGJfLN8L3PXdH0MB9LrLtCoPoNHtAKhPeJHaRdJxaTW9syZCVdVC3xuk3oVhP5jbWaQoaL2ttaWerHia8mm57xZAcFABiTHIq7nioaDZBR8Qk92yPTwxZCZBhpOuZCegywZDZD',

    // Database
    db: {
        host: 'crossover.proxy.rlwy.net',
        port: 28450,
        database: 'railway',
        user: 'root',
        password: 'KdYAKHVFUIMThJvluoPnzGqmBKWERMlM'
    },

    // Test Data
    testPhone: '15558219787',
    testName: 'Test User'
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

const colors = {
    reset: '\x1b[0m',
    green: '\x1b[32m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
    log(`✅ ${message}`, 'green');
}

function error(message) {
    log(`❌ ${message}`, 'red');
}

function info(message) {
    log(`ℹ️  ${message}`, 'cyan');
}

function section(title) {
    log(`\n${'='.repeat(60)}`, 'blue');
    log(`  ${title}`, 'blue');
    log(`${'='.repeat(60)}\n`, 'blue');
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// TEST 1: Railway Backend Health Check
// ============================================

async function testBackendHealth() {
    section('TEST 1: Railway Backend Health Check');

    try {
        info(`Testing: ${CONFIG.backendUrl}/`);
        const response = await axios.get(`${CONFIG.backendUrl}/`);

        if (response.data.status === 'online') {
            success('Backend is ONLINE');
            success(`Service: ${response.data.service}`);
            success(`Version: ${response.data.version}`);
            return true;
        } else {
            error('Backend returned unexpected response');
            console.log('Response:', response.data);
            return false;
        }
    } catch (err) {
        error('Backend is NOT accessible');
        error(`Error: ${err.message}`);
        if (err.response) {
            console.log('Response:', err.response.data);
        }
        return false;
    }
}

// ============================================
// TEST 2: Webhook Verification
// ============================================

async function testWebhookVerification() {
    section('TEST 2: Webhook Verification');

    try {
        const verifyToken = 'bazztech_webhook_2025';
        const challenge = 'test_challenge_12345';

        info(`Testing webhook verification...`);
        const url = `${CONFIG.backendUrl}/api/whatsapp/webhook?hub.mode=subscribe&hub.verify_token=${verifyToken}&hub.challenge=${challenge}`;

        const response = await axios.get(url);

        if (response.data === challenge) {
            success('Webhook verification WORKS');
            success(`Challenge echoed correctly: ${challenge}`);
            return true;
        } else {
            error('Webhook verification FAILED');
            error(`Expected: ${challenge}, Got: ${response.data}`);
            return false;
        }
    } catch (err) {
        error('Webhook verification error');
        error(`Error: ${err.message}`);
        return false;
    }
}

// ============================================
// TEST 3: Database Connection
// ============================================

async function testDatabaseConnection() {
    section('TEST 3: Database Connection');

    let connection;
    try {
        info('Connecting to MySQL database...');
        connection = await mysql.createConnection(CONFIG.db);

        success('Database connection established');

        // Test query
        info('Running test query...');
        const [rows] = await connection.execute(
            'SELECT COUNT(*) as count FROM leads'
        );

        success(`Database query successful`);
        success(`Total leads in database: ${rows[0].count}`);

        return true;
    } catch (err) {
        error('Database connection FAILED');
        error(`Error: ${err.message}`);
        return false;
    } finally {
        if (connection) await connection.end();
    }
}

// ============================================
// TEST 4: Find Test Lead
// ============================================

async function testFindLead() {
    section('TEST 4: Find Test Lead in Database');

    let connection;
    try {
        connection = await mysql.createConnection(CONFIG.db);

        info(`Looking for lead with phone: ${CONFIG.testPhone}`);
        const [rows] = await connection.execute(
            'SELECT * FROM leads WHERE phone = ?',
            [CONFIG.testPhone]
        );

        if (rows.length > 0) {
            const lead = rows[0];
            success('Test lead found!');
            console.log({
                id: lead.id,
                name: lead.customerName,
                phone: lead.phone,
                status: lead.status,
                package: lead.preferredPackage,
                location: lead.deliveryLocation,
                conversationHistory: lead.conversationHistory ? JSON.parse(lead.conversationHistory).length : 0
            });
            return lead;
        } else {
            error('Test lead NOT found');
            info('Creating test lead...');

            const [result] = await connection.execute(
                `INSERT INTO leads (customerName, phone, email, source, tag, status, createdAt) 
         VALUES (?, ?, ?, ?, ?, ?, NOW())`,
                [CONFIG.testName, CONFIG.testPhone, 'test@example.com', 'test', 'test', 'new']
            );

            success(`Test lead created with ID: ${result.insertId}`);
            return { id: result.insertId, phone: CONFIG.testPhone };
        }
    } catch (err) {
        error('Database operation FAILED');
        error(`Error: ${err.message}`);
        return null;
    } finally {
        if (connection) await connection.end();
    }
}

// ============================================
// TEST 5: Simulate WhatsApp Webhook
// ============================================

async function testWebhookSimulation() {
    section('TEST 5: Simulate WhatsApp Message Webhook');

    try {
        const webhookPayload = {
            from: CONFIG.testPhone,
            text: 'Yes, I am interested in internet',
            timestamp: Date.now()
        };

        info('Sending simulated webhook to backend...');
        info(`Payload: ${JSON.stringify(webhookPayload, null, 2)}`);

        const response = await axios.post(
            `${CONFIG.backendUrl}/api/whatsapp/webhook`,
            { body: webhookPayload }
        );

        success('Webhook received by backend');
        console.log('Response:', response.data);
        return true;
    } catch (err) {
        error('Webhook simulation FAILED');
        error(`Error: ${err.message}`);
        if (err.response) {
            console.log('Response:', err.response.data);
        }
        return false;
    }
}

// ============================================
// TEST 6: Check n8n Webhook
// ============================================

async function testN8nWebhook() {
    section('TEST 6: Test n8n Webhook Endpoint');

    try {
        const n8nUrl = 'https://n8n-production-c726.up.railway.app/webhook-test/whatsapp-response';

        info(`Testing n8n webhook: ${n8nUrl}`);

        const testPayload = {
            body: {
                from: CONFIG.testPhone,
                text: 'Test message from automated script',
                timestamp: Date.now()
            }
        };

        const response = await axios.post(n8nUrl, testPayload);

        success('n8n webhook is accessible');
        console.log('Response:', response.data);
        return true;
    } catch (err) {
        error('n8n webhook NOT accessible');
        error(`Error: ${err.message}`);
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Data:', err.response.data);
        }
        return false;
    }
}

// ============================================
// TEST 7: WhatsApp API Test
// ============================================

async function testWhatsAppAPI() {
    section('TEST 7: WhatsApp API Connection Test');

    try {
        info('Testing WhatsApp Business API...');

        // Get phone number info
        const url = `https://graph.facebook.com/v21.0/${CONFIG.whatsappPhoneNumberId}`;
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${CONFIG.whatsappAccessToken}`
            }
        });

        success('WhatsApp API is accessible');
        console.log('Phone Number Info:', {
            id: response.data.id,
            display_phone_number: response.data.display_phone_number,
            verified_name: response.data.verified_name
        });

        return true;
    } catch (err) {
        error('WhatsApp API connection FAILED');
        error(`Error: ${err.message}`);
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Error:', err.response.data);
        }
        return false;
    }
}

// ============================================
// TEST 8: OpenAI API Test
// ============================================

async function testOpenAI() {
    section('TEST 8: OpenAI API Connection Test');

    const openAIKey = process.env.OPENAI_API_KEY || 'YOUR_OPENAI_KEY';

    try {
        info('Testing OpenAI API...');

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: "Say 'OpenAI is working' in JSON format: { status: 'ok' }" }]
            },
            {
                headers: {
                    'Authorization': `Bearer ${openAIKey}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        success('OpenAI API is accessible');
        console.log('Response:', response.data.choices[0].message.content);

        return true;
    } catch (err) {
        error('OpenAI API connection FAILED');
        error(`Error: ${err.message}`);
        if (err.response) {
            console.log('Status:', err.response.status);
            console.log('Error:', JSON.stringify(err.response.data, null, 2));
        }
        return false;
    }
}

// ============================================
// MAIN TEST SUITE
// ============================================

async function runAllTests() {
    log('\n🚀 BAZZ AI WhatsApp Agent - Complete Test Suite\n', 'cyan');
    log(`Started at: ${new Date().toLocaleString()}\n`, 'yellow');

    const results = {
        backendHealth: false,
        webhookVerification: false,
        databaseConnection: false,
        findLead: false,
        webhookSimulation: false,
        n8nWebhook: false,
        whatsappAPI: false,
        openAI: false
    };

    // Run tests sequentially
    results.backendHealth = await testBackendHealth();
    await sleep(1000);

    results.webhookVerification = await testWebhookVerification();
    await sleep(1000);

    results.databaseConnection = await testDatabaseConnection();
    await sleep(1000);

    results.findLead = await testFindLead();
    await sleep(1000);

    results.webhookSimulation = await testWebhookSimulation();
    await sleep(1000);

    results.n8nWebhook = await testN8nWebhook();
    await sleep(1000);

    results.whatsappAPI = await testWhatsAppAPI();
    await sleep(1000);

    results.openAI = await testOpenAI();

    // Summary
    section('TEST SUMMARY');

    const passed = Object.values(results).filter(r => r === true).length;
    const total = Object.keys(results).length;

    console.log('');
    Object.entries(results).forEach(([test, result]) => {
        const status = result ? '✅ PASS' : '❌ FAIL';
        const color = result ? 'green' : 'red';
        log(`${status} - ${test}`, color);
    });

    console.log('');
    log(`\nTotal: ${passed}/${total} tests passed`, passed === total ? 'green' : 'yellow');

    if (passed === total) {
        log('\n🎉 ALL SYSTEMS GO! Ready for live testing!\n', 'green');
    } else {
        log('\n⚠️  Some tests failed. Please fix before proceeding.\n', 'yellow');
    }

    log(`Completed at: ${new Date().toLocaleString()}\n`, 'yellow');
}

// ============================================
// RUN TESTS
// ============================================

runAllTests().catch(err => {
    error('Test suite crashed');
    console.error(err);
    process.exit(1);
});
