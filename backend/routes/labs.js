import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL LABS
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        l.lab_id,
        l.lab_name,
        l.systems,
        l.software,
        l.current_occupancy,
        d.department_name
      FROM labs l
      JOIN departments d
      ON l.department_id = d.department_id
    `);

    res.json(rows);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;