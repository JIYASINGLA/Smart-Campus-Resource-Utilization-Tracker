import mysql from "mysql2";

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Lovepreet@2006",
  database: "campus_resource_tracker",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Promise-based pool
const promisePool = pool.promise();

console.log("✅ MySQL Pool Created...");

export default promisePool;