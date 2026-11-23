import "dotenv/config";
import mysql from "mysql2/promise";

const config = {
  host: process.env.DB_SERVER,
  port: Number(process.env.DB_PORT || 3306),
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10,
  idleTimeout: 30000,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

// Test connection
try {
  const connection = await pool.getConnection();
  console.log("MySQL connected successfully!");
  connection.release();
} catch (error) {
  console.error("MySQL connection failed:", error.message);
  process.exit(1);
}

export default pool;
