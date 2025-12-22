import 'dotenv/config';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

async function checkSchema() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    try {
        const [tables] = await connection.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
    `);

        console.log('Tables found:', tables);

        // Check specifically for submissions
        const submissionsTable = (tables as any[]).find((t: any) => t.TABLE_NAME === 'submissions');
        if (submissionsTable) {
            console.log('\nSchema for submissions:');
            const [columns] = await connection.query('DESCRIBE submissions');
            console.log(columns);
        } else {
            console.log('\nSubmissions table NOT found.');
        }

        // Check specifically for leads
        const leadsTable = (tables as any[]).find((t: any) => t.TABLE_NAME === 'leads');
        if (leadsTable) {
            console.log('\nSchema for leads:');
            const [columns] = await connection.query('DESCRIBE leads');
            console.log(columns);
        }

    } catch (error) {
        console.error('Error checking schema:', error);
    } finally {
        await connection.end();
    }
}

checkSchema();
