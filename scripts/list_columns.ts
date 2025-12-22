import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    const [leadsColumns] = await connection.query("SHOW COLUMNS FROM leads");
    console.log("Leads Columns:", leadsColumns);

    const [submissionsColumns] = await connection.query("SHOW COLUMNS FROM submissions");
    console.log("Submissions Columns:", submissionsColumns);

    const [tables] = await connection.query("SHOW TABLES");
    console.log("Tables:", tables);

    await connection.end();
}

main().catch(console.error);
