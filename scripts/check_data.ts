import 'dotenv/config';
import mysql from 'mysql2/promise';

async function checkData() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    try {
        // Count leads
        const [leadsCount] = await connection.query('SELECT COUNT(*) as count FROM leads');
        console.log('Total leads in database:', leadsCount);

        // Get a sample
        const [sampleLeads] = await connection.query('SELECT * FROM leads LIMIT 5');
        console.log('\nSample leads:');
        console.log(sampleLeads);

        // Count submissions
        const [submissionsCount] = await connection.query('SELECT COUNT(*) as count FROM submissions');
        console.log('\nTotal submissions in database:', submissionsCount);

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await connection.end();
    }
}

checkData();
