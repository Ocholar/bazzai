import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema.js";
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is missing from environment variables!');
}

const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export const db = drizzle(pool, { schema, mode: "default" });
console.log('Database pool initialized');
