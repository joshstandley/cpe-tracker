const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Register route
router.post("/", async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const pool = req.app.locals.pool;

        // Check if user already exists
        const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userCheck.rows.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user
        const newUser = await pool.query(
            "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [firstName, lastName, email, hashedPassword]
        );

        // Return the new user (without password)
        const { password: _, ...userData } = newUser.rows[0];
        res.status(201).json(userData);
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;
