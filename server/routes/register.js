const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db"); // Assuming you have a PostgreSQL pool instance
const router = express.Router();

// Register route
router.post("/", async (req, res) => {
  const { username, email, password } = req.body;

  // Validate user data (simple validation)
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email",
      [username, email, hashedPassword]
    );

    const newUser = result.rows[0];
    // Respond with user data (excluding password)
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
