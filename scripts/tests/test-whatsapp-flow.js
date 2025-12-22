/**
 * WhatsApp Workflow Test Script
 * Simulates incoming WhatsApp messages to test the full conversation flow
 */

const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL_HERE';

// Test conversation scenarios
const scenarios = {
    fullQualification: [
        { text: 'Yes, tell me more', description: 'Initial interest' },
        { text: 'I want the 30Mbps package', description: 'Package selection' },
        { text: 'Nairobi, Westlands area', description: 'Location' },
        { text: 'December 5th would be great', description: 'Preferred date' },
        { text: 'Morning works best for me', description: 'Preferred time' },
    ],
    rejection: [
        { text: 'No thanks, not interested', description: 'Rejection' }
    ],
    partialInfo: [
        { text: 'Yes interested', description: 'Interest' },
        { text: '15Mbps', description: 'Package only' },
    ]
};

async function sendMessage(text, phoneFrom = '254720821051') {
    const webhookData = {
        from: phoneFrom,
        text: text,
        timestamp: new Date().toISOString(),
        messageId: `test_${Date.now()}`,
        profileName: 'Test User'
    };

    console.log(`\n📤 Sending: "${text}"`);

    try {
        const response = await fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ body: webhookData })
        });

        const result = await response.text();
        console.log(`✅ Response: ${response.status} ${response.statusText}`);

        if (result) {
            console.log(`📥 Body: ${result.substring(0, 200)}`);
        }

        return response.ok;
    } catch (error) {
        console.error(`❌ Error:`, error.message);
        return false;
    }
}

async function runScenario(scenarioName, messages, delayBetweenMessages = 3000) {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🧪 Testing Scenario: ${scenarioName}`);
    console.log(`${'='.repeat(60)}`);

    for (const msg of messages) {
        console.log(`\n📋 Step: ${msg.description}`);
        await sendMessage(msg.text);

        if (messages.indexOf(msg) < messages.length - 1) {
            console.log(`⏳ Waiting ${delayBetweenMessages / 1000}s for AI response...`);
            await new Promise(resolve => setTimeout(resolve, delayBetweenMessages));
        }
    }

    console.log(`\n✅ Scenario "${scenarioName}" completed!`);
}

async function main() {
    console.log('🚀 WhatsApp Workflow Test Suite\n');

    if (!N8N_WEBHOOK_URL || N8N_WEBHOOK_URL.includes('YOUR_N8N')) {
        console.error('❌ ERROR: Please set N8N_WEBHOOK_URL environment variable!');
        console.log('   Example: N8N_WEBHOOK_URL=https://your-n8n.com/webhook/xyz npm run test:whatsapp');
        process.exit(1);
    }

    const args = process.argv.slice(2);
    const scenarioName = args[0] || 'fullQualification';

    if (!scenarios[scenarioName]) {
        console.error(`❌ Unknown scenario: ${scenarioName}`);
        console.log(`Available scenarios: ${Object.keys(scenarios).join(', ')}`);
        process.exit(1);
    }

    await runScenario(scenarioName, scenarios[scenarioName]);

    console.log('\n✅ All tests completed!');
    console.log('\n📊 Next: Run the verification script to check database updates');
    console.log('   node verify-whatsapp-data.js');
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { sendMessage, runScenario };
