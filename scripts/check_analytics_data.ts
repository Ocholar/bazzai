import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    const [analyticsData] = await connection.query("SELECT * FROM analytics LIMIT 5");
    console.log("Analytics Data:", analyticsData);

    await connection.end();
}

main().catch(console.error);
