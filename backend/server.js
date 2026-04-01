import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./db.js";

import teachersRoute from "./routes/teachers.js";
import roomsRoute from "./routes/roomRoutes.js";
import labsRoute from "./routes/labs.js";
import bookingsRouter from "./routes/bookings.js";

dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/bookings", bookingsRouter);
app.use("/api/rooms", roomsRoute);
app.use("/api/teachers", teachersRoute);
app.use("/api/labs", labsRoute);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("🚀 Backend running with ES Modules + MySQL Pool");
});

// ✅ Test DB
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= TIMETABLE APIs =================

// ✅ Get all timetable
app.get("/timetable", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM timetable");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get timetable by teacher
app.get("/timetable/teacher/:teacherID", async (req, res) => {
  try {
    const { teacherID } = req.params;

    const [rows] = await db.query(
      "SELECT * FROM timetable WHERE teacherID = ?",
      [teacherID]
    );

    res.json(rows); // ✅ always array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Add timetable
app.post("/timetable", async (req, res) => {
  try {
    const { time, subject, room, students, status, teacherID } = req.body;

    const [result] = await db.query(
      "INSERT INTO timetable (time, subject, room, students, status, teacherID) VALUES (?, ?, ?, ?, ?, ?)",
      [time, subject, room, students, status, teacherID]
    );

    res.json({ id: result.insertId, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Update timetable
app.put("/timetable/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { time, subject, room, students, status, teacherID } = req.body;

    await db.query(
      "UPDATE timetable SET time=?, subject=?, room=?, students=?, status=?, teacherID=? WHERE id=?",
      [time, subject, room, students, status, teacherID, id]
    );

    res.json({ message: "Updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete timetable
app.delete("/timetable/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await db.query("DELETE FROM timetable WHERE id=?", [id]);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ================= MERGE REQUEST APIs =================

app.get("/merge-requests", async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM merge_requests ORDER BY createdAt DESC"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/merge-requests", async (req, res) => {
  try {
    const { subject, sectionA, sectionB, date, time, room, reason } = req.body;

    if (!subject || !sectionA || !sectionB || !date || !time || !room || !reason) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const [result] = await db.query(
      "INSERT INTO merge_requests (subject, sectionA, sectionB, date, time, room, reason) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [subject, sectionA, sectionB, date, time, room, reason]
    );

    const [rows] = await db.query(
      "SELECT * FROM merge_requests WHERE id = ?",
      [result.insertId]
    );

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});