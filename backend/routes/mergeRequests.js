// Create table in MySQL
/*
CREATE TABLE IF NOT EXISTS merge_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100) NOT NULL,
    sectionA VARCHAR(50) NOT NULL,
    sectionB VARCHAR(50) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    room VARCHAR(50) NOT NULL,
    reason VARCHAR(255) NOT NULL
);
*/

// POST merge request
app.post("/merge-requests", (req, res) => {
  const { subject, sectionA, sectionB, date, time, room, reason } = req.body;

  if (!subject || !sectionA || !sectionB || !date || !time || !room || !reason) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const query = `
    INSERT INTO merge_requests
    (subject, sectionA, sectionB, date, time, room, reason)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [subject, sectionA, sectionB, date, time, room, reason], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: result.insertId, ...req.body });
  });
});

// GET all merge requests
app.get("/merge-requests", (req, res) => {
  db.query("SELECT * FROM merge_requests ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});