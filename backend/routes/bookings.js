import express from "express";
import db from "../db.js"; // ✅ your promise pool

const router = express.Router();

// ================= POST: Create Booking =================
router.post("/", async (req, res) => {
  try {
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

    // ✅ Validation
    if (
      !department || !room || !date || !startTime ||
      !endTime || !purpose || !requesterName || !requesterDept
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const query = `
      INSERT INTO bookings
      (department, room, date, startTime, endTime, purpose, requesterName, requesterDept)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.query(query, [
      department,
      room,
      date,
      startTime,
      endTime,
      purpose,
      requesterName,
      requesterDept,
    ]);

    res.json({
      message: "Booking submitted successfully",
      bookingId: result.insertId,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// ================= GET: Check Availability =================
router.get("/", async (req, res) => {
  try {
    const { room, date } = req.query;

    if (!room || !date) {
      return res.status(400).json({ error: "Room and date are required" });
    }

    const query = "SELECT * FROM bookings WHERE room = ? AND date = ?";

    const [results] = await db.query(query, [room, date]);

    res.json(results); // ✅ always array

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;