import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config();

// Create a connection pool instead of top-level await
const pool = mysql.createPool({
    uri: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema, mode: "default" });
