const mysql = require('mysql2/promise');

async function checkConversation(phone) {
  const connection = await mysql.createConnection({
    host: 'crossover.proxy.rlwy.net',
    port: 28450,
    user: 'root',
    password: 'KdYAKHVFUIMThJvluoPnzGqmBKWERMlM',
    database: 'railway'
  });

  try {
    console.log(`\n🔍 Checking lead: ${phone}\n`);
    
    const [leads] = await connection.execute(
      'SELECT * FROM leads WHERE phone = ?',
      [phone]
    );

    if (leads.length === 0) {
      console.log('❌ No lead found with this phone number');
      return;
    }

    const lead = leads[0];
    console.log('📊 Lead Status:');
    console.log(`   Name: ${lead.name || 'Not set'}`);
    console.log(`   Phone: ${lead.phone}`);
    console.log(`   Stage: ${lead.qualification_stage || 'unknown'}`);
    console.log(`   Location: ${lead.location || 'Not set'}`);
    
    if (lead.conversation_history) {
      const history = JSON.parse(lead.conversation_history);
      console.log(`\n💬 Conversation (${history.length} messages):`);
      history.slice(-5).forEach((msg, i) => {
        const time = new Date(msg.timestamp).toLocaleTimeString();
        console.log(`   [${time}] ${msg.role}: ${msg.content}`);
      });
    }

    console.log(`\n⏰ Last Updated: ${new Date(lead.updated_at).toLocaleString()}\n`);
  } finally {
    await connection.end();
  }
}

const phone = process.argv[2] || '254720821051';
checkConversation(phone).catch(console.error);
