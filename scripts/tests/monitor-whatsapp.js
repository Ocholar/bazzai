/**
 * WhatsApp Conversation Monitor
 * Real-time monitoring of conversation progress and database updates
 */

const { checkLeadData } = require('./verify-whatsapp-data.js');

let previousState = null;

async function monitorLead(phone = '254720821051', intervalSeconds = 5) {
    console.log(`🔄 Monitoring lead: ${phone}`);
    console.log(`   Refresh interval: ${intervalSeconds}s`);
    console.log(`   Press Ctrl+C to stop\n`);

    const check = async () => {
        const leadData = await checkLeadData(phone);

        if (!leadData) {
            console.log('⏳ Waiting for lead data...');
            return;
        }

        // Detect changes
        if (previousState) {
            const changes = [];

            if (leadData.status !== previousState.status) {
                changes.push(`Status: ${previousState.status} → ${leadData.status}`);
            }

            if (leadData.preferredPackage !== previousState.preferredPackage) {
                changes.push(`Package: ${previousState.preferredPackage || 'none'} → ${leadData.preferredPackage}`);
            }

            if (leadData.deliveryLocation !== previousState.deliveryLocation) {
                changes.push(`Location: ${previousState.deliveryLocation || 'none'} → ${leadData.deliveryLocation}`);
            }

            const prevHistory = previousState.conversationHistory ?
                (typeof previousState.conversationHistory === 'string' ?
                    JSON.parse(previousState.conversationHistory).length : previousState.conversationHistory.length) : 0;

            const currHistory = leadData.conversationHistory ?
                (typeof leadData.conversationHistory === 'string' ?
                    JSON.parse(leadData.conversationHistory).length : leadData.conversationHistory.length) : 0;

            if (currHistory > prevHistory) {
                changes.push(`New messages: ${currHistory - prevHistory}`);
            }

            if (changes.length > 0) {
                console.log(`\n🔔 CHANGES DETECTED:`);
                changes.forEach(change => console.log(`   • ${change}`));
                console.log('');
            }
        }

        previousState = leadData;
    };

    // Initial check
    await check();

    // Set up interval
    setInterval(check, intervalSeconds * 1000);
}

async function main() {
    console.log('👀 WhatsApp Conversation Monitor\n');

    const args = process.argv.slice(2);
    const phone = args[0] || '254720821051';
    const interval = parseInt(args[1]) || 5;

    await monitorLead(phone, interval);
}

// Run if executed directly
if (require.main === module) {
    main().catch(console.error);
}

module.exports = { monitorLead };
