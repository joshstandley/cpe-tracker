const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const activitiesResult = await req.app.locals.pool.query(
      "SELECT * FROM cpe_activities WHERE user_id = $1",
      [req.user.id]
    );

    res.status(200).json(activitiesResult.rows);
  } catch (err) {
    console.error("CPE activities error:", err.message);
    res.status(500).json({ message: "Server error during CPE activities access." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { title, date, provider, credit_hours, cpe_type_id, credential_id } = req.body;

  try {
    await req.app.locals.pool.query(
      "INSERT INTO cpe_activities (user_id, title, date, provider, credit_hours, cpe_type_id, credential_id) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [req.user.id, title, date, provider, credit_hours, cpe_type_id, credential_id]
    );

    res.status(201).json({ message: "Activity added successfully!" });
  } catch (err) {
    console.error("CPE activity add error:", err.message);
    res.status(500).json({ message: "Server error during CPE activity add." });
  }
});

module.exports = router;
