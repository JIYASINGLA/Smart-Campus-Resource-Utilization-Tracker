import db from "../config/db.js";

export const createDepartment = async (req, res) => {
  try {
    const { department_name } = req.body;

    if (!department_name || department_name.trim() === "") {
      return res.status(400).json({ message: "Department name required" });
    }

    // Check if already exists
    const [existing] = await db.query(
      "SELECT * FROM departments WHERE department_name = ?",
      [department_name]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: "Department already exists" });
    }

    const [result] = await db.query(
      "INSERT INTO departments (department_name) VALUES (?)",
      [department_name]
    );

    res.status(201).json({
      message: "Department created",
      department_id: result.insertId,
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getDepartments = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM departments ORDER BY department_id DESC"
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentById = async (req, res) => { try { const { id } = req.params; const [rows] = await db.query( "SELECT * FROM departments WHERE department_id = ?", [id] ); if (rows.length === 0) { return res.status(404).json({ message: "Department not found" }); } res.status(200).json(rows[0]); } catch (error) { res.status(500).json({ error: error.message }); } };

export const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { department_name } = req.body;

    const [result] = await db.query(
      "UPDATE departments SET department_name = ? WHERE department_id = ?",
      [department_name, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM departments WHERE department_id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json({ message: "Department deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};