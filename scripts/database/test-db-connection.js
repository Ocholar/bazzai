import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function testConnection() {
    console.log('Testing MySQL Connection...');
    const dbUrl = process.env.DATABASE_URL;

    if (!dbUrl) {
        console.error('❌ DATABASE_URL is missing in .env');
        process.exit(1);
    }

    console.log('URL:', dbUrl.replace(/:[^:@]+@/, ':****@')); // Mask password

    try {
        const connection = await mysql.createConnection(dbUrl);
        console.log('✅ Connection Successful!');

        const [rows] = await connection.execute('SELECT 1 as val');
        console.log('Query Result:', rows);

        await connection.end();
        process.exit(0);
    } catch (error) {
        console.error('❌ Connection Failed:', error.message);
        process.exit(1);
    }
}

testConnection();
