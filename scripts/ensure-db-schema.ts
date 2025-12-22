import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

async function ensureTablesExist() {
    const url = process.env.DATABASE_URL || process.env.MYSQL_URL;

    if (!url) {
        console.error("❌ No DATABASE_URL or MYSQL_URL found");
        process.exit(1);
    }

    console.log("🔌 Connecting to database...");
    const connection = await mysql.createConnection(url);

    try {
        // 1. Ensure USERS table exists
        const [usersTable] = await connection.query("SHOW TABLES LIKE 'users'");
        if ((usersTable as any[]).length === 0) {
            console.log("📋 Creating users table...");
            await connection.query(`
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    openId VARCHAR(64) NOT NULL UNIQUE,
                    name TEXT NULL,
                    email VARCHAR(320) NULL,
                    loginMethod VARCHAR(64) NULL,
                    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    lastSignedIn TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
                )
            `);
            console.log("✅ Users table created");
        } else {
            console.log("✅ Users table already exists");
        }

        // 2. Ensure LEADS table exists
        const [leadsTable] = await connection.query("SHOW TABLES LIKE 'leads'");
        if ((leadsTable as any[]).length === 0) {
            console.log("📋 Creating leads table...");
            await connection.query(`
                CREATE TABLE leads (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    customerName TEXT NULL,
                    phone VARCHAR(20) NOT NULL,
                    email VARCHAR(320) NULL,
                    source VARCHAR(50) NOT NULL,
                    tag ENUM('high_value', 'high_volume') NOT NULL,
                    status ENUM('new', 'contacted', 'qualified', 'submitted', 'installed', 'failed') NOT NULL DEFAULT 'new',
                    preferredPackage ENUM('15mbps', '30mbps', 'unspecified') DEFAULT 'unspecified',
                    installationTown TEXT NULL,
                    deliveryLocation TEXT NULL,
                    preferredDate TIMESTAMP NULL,
                    preferredTime VARCHAR(20) NULL,
                    conversationHistory JSON NULL,
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log("✅ Leads table created");
        } else {
            console.log("✅ Leads table already exists");
            // Apply fixes for existing leads table
            try {
                await connection.query("ALTER TABLE leads MODIFY COLUMN customerName TEXT NULL");
                await connection.query("ALTER TABLE leads MODIFY COLUMN email VARCHAR(320) NULL");
                await connection.query("ALTER TABLE leads MODIFY COLUMN installationTown TEXT NULL");
                await connection.query("ALTER TABLE leads MODIFY COLUMN deliveryLocation TEXT NULL");
                await connection.query("ALTER TABLE leads MODIFY COLUMN preferredPackage ENUM('15mbps', '30mbps', 'unspecified') DEFAULT 'unspecified'");
            } catch (err) {
                // Ignore errors if columns don't exist
            }
        }

        // 3. Ensure SUBMISSIONS table exists
        const [submissionsTable] = await connection.query("SHOW TABLES LIKE 'submissions'");
        if ((submissionsTable as any[]).length === 0) {
            console.log("📋 Creating submissions table...");
            await connection.query(`
                CREATE TABLE submissions (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    leadId INT NOT NULL,
                    status ENUM('pending', 'success', 'failed', 'retry') NOT NULL DEFAULT 'pending',
                    submissionPayload JSON NULL,
                    responseCode INT NULL,
                    responseBody TEXT NULL,
                    errorMessage TEXT NULL,
                    retryCount INT DEFAULT 0,
                    lastRetryAt TIMESTAMP NULL,
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log("✅ Submissions table created");
        } else {
            console.log("✅ Submissions table already exists");
        }

        // 4. Ensure ANALYTICS table exists
        const [analyticsTable] = await connection.query("SHOW TABLES LIKE 'analytics'");
        if ((analyticsTable as any[]).length === 0) {
            console.log("📋 Creating analytics table...");
            await connection.query(`
                CREATE TABLE analytics (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    date TIMESTAMP NOT NULL,
                    totalLeads INT DEFAULT 0,
                    contactedLeads INT DEFAULT 0,
                    qualifiedLeads INT DEFAULT 0,
                    submittedLeads INT DEFAULT 0,
                    installedLeads INT DEFAULT 0,
                    failedLeads INT DEFAULT 0,
                    package15Count INT DEFAULT 0,
                    package30Count INT DEFAULT 0,
                    submissionSuccessRate DECIMAL(5, 2) DEFAULT 0,
                    conversionRate DECIMAL(5, 2) DEFAULT 0,
                    avgCommissionPerGA DECIMAL(10, 2) DEFAULT 0,
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log("✅ Analytics table created");
        } else {
            console.log("✅ Analytics table already exists");
        }

        // 5. Ensure CONFIG table exists
        const [configTable] = await connection.query("SHOW TABLES LIKE 'config'");
        if ((configTable as any[]).length === 0) {
            console.log("📋 Creating config table...");
            await connection.query(`
                CREATE TABLE config (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    \`key\` VARCHAR(100) NOT NULL UNIQUE,
                    value JSON NULL,
                    description TEXT NULL,
                    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);
            console.log("✅ Config table created");
        } else {
            console.log("✅ Config table already exists");
        }

        console.log("\n✅ Database schema is ready!");
    } catch (error) {
        console.error("❌ Error:", error);
        throw error;
    } finally {
        await connection.end();
    }
}

ensureTablesExist().catch(console.error);
