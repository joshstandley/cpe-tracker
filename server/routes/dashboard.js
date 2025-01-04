const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken"); // Import authenticateToken

console.log("authenticateToken middleware imported:", authenticateToken);

// Protected dashboard route
router.get("/", authenticateToken, async (req, res) => {
  try {
    const userResult = await req.app.locals.pool.query(
      "SELECT first_name, last_name FROM users WHERE id = $1",
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];
    res.status(200).json({
      message: `Welcome, ${user.first_name} ${user.last_name}!`,
      user: user,
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ message: "Server error during dashboard access." });
  }
});

module.exports = router;
