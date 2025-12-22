import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function createTestLead() {
    const dbUrl = process.env.DATABASE_URL;
    const connection = await mysql.createConnection(dbUrl);

    const phone = '254720821051';

    // Check if exists
    const [rows] = await connection.execute('SELECT * FROM leads WHERE phone = ?', [phone]);

    if (rows.length > 0) {
        console.log('Lead already exists, resetting status...');
        await connection.execute('UPDATE leads SET status = "new", conversationHistory = NULL WHERE phone = ?', [phone]);
        console.log('Lead reset.');
    } else {
        console.log('Creating test lead...');
        await connection.execute(
            'INSERT INTO leads (phone, customerName, source, tag, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
            [phone, 'Test User', 'manual', 'high_value', 'new']
        );
        console.log('Lead created.');
    }

    await connection.end();
    process.exit(0);
}

createTestLead();
