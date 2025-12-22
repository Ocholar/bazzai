import { db } from '../server/db.js';
import { sql } from 'drizzle-orm';

async function run() {
    try {
        const [rows]: any = await db.execute(sql`DESCRIBE leads`);
        console.log('Leads columns:');
        rows.forEach((r: any) => console.log(`- ${r.Field} (${r.Type})`));

        const [subRows]: any = await db.execute(sql`DESCRIBE submissions`);
        console.log('\nSubmissions columns:');
        subRows.forEach((r: any) => console.log(`- ${r.Field} (${r.Type})`));

    } catch (error) {
        console.error('Error:', error);
    } finally {
        process.exit(0);
    }
}

run();
