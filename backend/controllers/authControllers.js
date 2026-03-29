import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// 🔹 REGISTER FACULTY
export const register = async (req, res) => {
  const { name, email, password, department_id } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
      INSERT INTO users (name, email, password, department_id, role)
      VALUES (?, ?, ?, ?, 'faculty')
    `;

    db.query(sql, [name, email, hashedPassword, department_id], (err, result) => {
      if (err) {
        // return res.status(400).json({ message: "User already exists or error occurred" });
        console.error(err);
   res.status(500).json({ error: err.message });
      }


   

      res.status(201).json({ message: "Faculty registered successfully" });
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// 🔹 LOGIN
export const login = (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;

  db.query(sql, [email], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.user_id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token,
      role: user.role
    });
  });
};