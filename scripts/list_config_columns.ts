import mysql from "mysql2/promise";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
    const connection = await mysql.createConnection(process.env.DATABASE_URL!);

    const [configColumns] = await connection.query("SHOW COLUMNS FROM config");
    console.log("Config Columns:", configColumns);

    const [analyticsColumns] = await connection.query("SHOW COLUMNS FROM analytics");
    console.log("Analytics Columns:", analyticsColumns);

    await connection.end();
}

main().catch(console.error);
