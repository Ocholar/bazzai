import 'dotenv/config';
import mysql from 'mysql2/promise';

async function test() {
    console.log('Testing DB connection...');
    if (!process.env.DATABASE_URL) {
        console.error('DATABASE_URL is not set!');
        process.exit(1);
    }
    try {
        const connection = await mysql.createConnection(process.env.DATABASE_URL);
        console.log('Connection successful!');
        const [rows] = await connection.execute('SELECT 1 as result');
        console.log('Query result:', rows);
        await connection.end();
    } catch (error) {
        console.error('Connection failed:', error);
    }
}

test();
