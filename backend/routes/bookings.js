const express = require("express");
const router = express.Router();
const db = require("../db"); // create this db.js that exports MySQL connection

// POST new booking
router.post("/", (req, res) => {
  const {
    department,
    room,
    date,
    startTime,
    endTime,
    purpose,
    requesterName,
    requesterDept,
  } = req.body;

  if (!department || !room || !date || !startTime || !endTime || !purpose || !requesterName || !requesterDept) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO bookings
    (department, room, date, startTime, endTime, purpose, requesterName, requesterDept)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [department, room, date, startTime, endTime, purpose, requesterName, requesterDept],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "Booking submitted successfully", bookingId: result.insertId });
    }
  );
});

// GET bookings (check availability)
router.get("/", (req, res) => {
  const { room, date } = req.query;

  if (!room || !date) {
    return res.status(400).json({ error: "Room and date are required" });
  }

  const query = "SELECT * FROM bookings WHERE room = ? AND date = ?";
  db.query(query, [room, date], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results); // returns [] if no bookings
  });
});

module.exports = router;