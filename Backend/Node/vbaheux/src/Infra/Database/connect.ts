import mysql from "mysql2/promise";

/**
 * Database connection pool for MySQL
 */
const db = mysql.createPool({
  host: "localhost",
  user: "user",
  password: "password",
  database: "db",
  decimalNumbers: true,
});

export { db };
