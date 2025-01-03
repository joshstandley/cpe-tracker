const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

// Register route
app.post("/api/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const userCheck = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userCheck.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name, email",
      [firstName, lastName, email, hashedPassword]
    );

    const user = newUser.rows[0];
    res.status(201).json({ user });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ message: "Server error during registration." });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    if (userResult.rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const user = userResult.rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token, message: "Login successful." });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ message: "Server error during login." });
  }
});

// Protected dashboard route
app.get("/api/dashboard", authenticateToken, async (req, res) => {
  try {
    const userResult = await pool.query(
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

// Fetch all available credentials
app.get("/api/credentials", authenticateToken, async (req, res) => {
  try {
    const credentials = await pool.query("SELECT id, name FROM credentials");
    res.status(200).json(credentials.rows);
  } catch (err) {
    console.error("Error fetching credentials:", err.message);
    res.status(500).json({ message: "Server error while fetching credentials." });
  }
});

// Save user's selected credentials
app.post("/api/user-credentials", authenticateToken, async (req, res) => {
  try {
    const { credentialIds } = req.body;

    if (!Array.isArray(credentialIds) || credentialIds.length === 0) {
      return res.status(400).json({ message: "Invalid credential selection." });
    }

    // Clear existing credentials for the user
    await pool.query("DELETE FROM user_credentials WHERE user_id = $1", [req.user.id]);

    // Add the new credentials
    const insertPromises = credentialIds.map((credentialId) =>
      pool.query("INSERT INTO user_credentials (user_id, credential_id) VALUES ($1, $2)", [
        req.user.id,
        credentialId,
      ])
    );
    await Promise.all(insertPromises);

    res.status(200).json({ message: "Credentials updated successfully." });
  } catch (err) {
    console.error("Error saving user credentials:", err.message);
    res.status(500).json({ message: "Server error while saving credentials." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
