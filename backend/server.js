// server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2");

const bookingsRouter = require("./routes/bookings");
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",        // change if needed
  password: "root",        // your MySQL password
  database: "campusDB" // create this DB in MySQL
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.log("❌ MySQL Connection Failed:", err);
  } else {
    console.log("✅ MySQL Connected");
  }
});

// ✅ Mount bookings route
app.use("/bookings", bookingsRouter);

// ✅ Test Route
app.get("/", (req, res) => {
  res.send("🚀 Backend with MySQL is running!");
});

// ✅ Example Route (Test DB)
app.get("/test-db", (req, res) => {
  db.query("SELECT 1 + 1 AS result", (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json(result);
    }
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

// ✅ Get all timetable entries
app.get("/timetable", (req, res) => {
  const query = "SELECT * FROM timetable";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Get timetable by teacherID
app.get("/timetable/teacher/:teacherID", (req, res) => {
  const { teacherID } = req.params;
  const query = "SELECT * FROM timetable WHERE teacherID = ?";
  db.query(query, [teacherID], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// ✅ Add new timetable entry
app.post("/timetable", (req, res) => {
  const { time, subject, room, students, status, teacherID } = req.body;
  const query = "INSERT INTO timetable (time, subject, room, students, status, teacherID) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(query, [time, subject, room, students, status, teacherID], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ id: result.insertId, ...req.body });
  });
});

// ✅ Update timetable entry
app.put("/timetable/:id", (req, res) => {
  const { id } = req.params;
  const { time, subject, room, students, status, teacherID } = req.body;
  const query = "UPDATE timetable SET time=?, subject=?, room=?, students=?, status=?, teacherID=? WHERE id=?";
  db.query(query, [time, subject, room, students, status, teacherID, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Timetable entry updated" });
  });
});

// ✅ Delete timetable entry
app.delete("/timetable/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM timetable WHERE id=?";
  db.query(query, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Timetable entry deleted" });
  });
});

// ✅ Get all merge requests
app.get("/merge-requests", (req, res) => {
  const query = "SELECT * FROM merge_requests ORDER BY createdAt DESC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// ✅ Add a new merge request
app.post("/merge-requests", (req, res) => {
  const { subject, sectionA, sectionB, date, time, room, reason } = req.body;

  if (!subject || !sectionA || !sectionB || !date || !time || !room || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query =
    "INSERT INTO merge_requests (subject, sectionA, sectionB, date, time, room, reason) VALUES (?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [subject, sectionA, sectionB, date, time, room, reason], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    
    // Return the inserted request
    db.query("SELECT * FROM merge_requests WHERE id = ?", [result.insertId], (err2, rows) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json(rows[0]);
    });
  });
});