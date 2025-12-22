import 'dotenv/config';
import { createLead } from '../server/db';
import { InsertLead } from '../drizzle/schema';
import { getDb } from '../server/db';

async function main() {
    console.log('Connecting to database...');
    const db = await getDb();
    if (!db) {
        console.error('Failed to connect to database');
        process.exit(1);
    }

    console.log('Inserting test lead...');
    const lead: InsertLead = {
        customerName: 'Ochola Ochi',
        phone: '254720821051',
        source: 'manual',
        tag: 'high_value',
        status: 'new',
        // preferredPackage is optional and defaults to 'unspecified'
    };

    try {
        await createLead(lead);
        console.log('Successfully inserted test lead: Ochola Ochi');
    } catch (error) {
        console.error('Error inserting lead:', error);
    } finally {
        process.exit(0);
    }
}

main();
