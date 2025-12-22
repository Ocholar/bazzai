import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function testConnection() {
    console.log('Testing MySQL Connection...');
    console.log('URL:', process.env.DATABASE_URL?.replace(/:[^:@]+@/, ':****@')); // Mask password

    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL as string);
        console.log('✅ Connection Successful!');

        const [rows] = await connection.execute('SELECT 1 as val');
        console.log('Query Result:', rows);

        await connection.end();
        process.exit(0);
    } catch (error: any) {
        console.error('❌ Connection Failed:', error.message);
        process.exit(1);
    }
}

testConnection();
