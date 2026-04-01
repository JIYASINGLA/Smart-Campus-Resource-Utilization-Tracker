import express from "express";
import db from "../db.js";

const router = express.Router();


// GET ALL ROOMS
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                r.room_id,
                r.room_number,
                r.capacity,
                r.current_occupancy,
                r.room_type,
                r.is_active,
                d.department_name
            FROM rooms r
            JOIN departments d 
            ON r.department_id = d.department_id
        `);

        res.json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Database error" });
    }
});

export default router;