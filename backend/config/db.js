const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test connection when server starts
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log(`✅ Connected to the database (thread ID: ${connection.threadId})`);
    connection.release(); // release immediately after testing
  } catch (err) {
    console.error('❌ Database connection failed:', err);
  }
})();

module.exports = pool;
