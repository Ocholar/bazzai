// Example fix for your backend - add retry logic to database connection

const mysql = require('mysql2/promise');

async function connectWithRetry(maxRetries = 10, delay = 3000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const connection = await mysql.createConnection(process.env.DATABASE_URL);
      console.log('Database connected successfully');
      return connection;
    } catch (error) {
      console.log(`Database connection attempt ${i + 1} failed. Retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Failed to connect to database after multiple retries');
}

module.exports = { connectWithRetry };
