import express from "express";
import db from "../db.js";

const router = express.Router();

// GET ALL TEACHERS
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT 
        t.teacher_id,
        t.name,
        t.subject,
        t.assigned_room,
        t.status,
        d.department_name
      FROM teachers t
      JOIN departments d
      ON t.department_id = d.department_id
    `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;