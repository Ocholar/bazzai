import 'dotenv/config';
import mysql from 'mysql2/promise';

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);
    console.log('Connected to database.');

    console.log('Altering table leads...');
    // Modify preferredPackage to be longer to support '5g_30mbps' etc.
    await connection.execute("ALTER TABLE leads MODIFY COLUMN preferredPackage VARCHAR(50)");
    console.log('Table altered successfully.');

    const [rows] = await connection.execute('DESCRIBE leads');
    console.log('Updated Schema for leads table:');
    console.log(JSON.stringify(rows, null, 2));

    await connection.end();
}

main().catch(console.error);
