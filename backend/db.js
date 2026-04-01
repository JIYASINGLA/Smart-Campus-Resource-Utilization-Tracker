// db.js
const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // your MySQL username
  password: "root",// your MySQL password
  database: "campusDB"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("Connected to MySQL database campusDB");
});

module.exports = db;