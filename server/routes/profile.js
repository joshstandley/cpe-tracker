const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userResult = await req.app.locals.pool.query(
      "SELECT first_name, last_name, email FROM users WHERE user_id = $1",
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(userResult.rows[0]);
  } catch (err) {
    console.error("Profile error:", err.message);
    res.status(500).json({ message: "Server error during profile access." });
  }
});

router.put("/", authenticateToken, async (req, res) => {
  const { first_name, last_name, email } = req.body;

  try {
    await req.app.locals.pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE user_id = $4",
      [first_name, last_name, email, req.user.id]
    );

    res.status(200).json({ message: "Profile updated successfully!" });
  } catch (err) {
    console.error("Profile update error:", err.message);
    res.status(500).json({ message: "Server error during profile update." });
  }
});

module.exports = router;
