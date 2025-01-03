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

// Routes

// Fetch credentials
app.get("/api/credentials", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name FROM credentials");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching credentials:", err.message);
    res.status(500).json({ message: "Failed to fetch credentials." });
  }
});

// Save user-selected credentials
app.post("/api/user/credentials", authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const { selectedCredentials } = req.body;

  if (!Array.isArray(selectedCredentials)) {
    return res.status(400).json({ message: "Invalid data format." });
  }

  try {
    // Delete existing credentials for the user
    await pool.query("DELETE FROM user_credentials WHERE user_id = $1", [userId]);

    // Insert new credentials
    const insertValues = selectedCredentials.map((credentialId) => `(${userId}, ${credentialId})`).join(",");
    await pool.query(`INSERT INTO user_credentials (user_id, credential_id) VALUES ${insertValues}`);

    res.status(200).json({ message: "Credentials saved successfully." });
  } catch (err) {
    console.error("Error saving user credentials:", err.message);
    res.status(500).json({ message: "Failed to save credentials." });
  }
});

// Fetch user credentials
app.get("/api/user/credentials", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT c.id, c.name
      FROM user_credentials uc
      INNER JOIN credentials c ON uc.credential_id = c.id
      WHERE uc.user_id = $1
    `;
    const result = await pool.query(query, [userId]);

    res.status(200).json(result.rows);
  } catch (err) {
    console.error("Error fetching user credentials:", err.message);
    res.status(500).json({ message: "Failed to fetch user credentials." });
  }
});

// Add CPE credit for a user
app.post("/api/cpe-credits", authenticateToken, async (req, res) => {
  try {
    const { credentialId, cpeTypeId, hours, deliveryMethod, dateCompleted } = req.body;

    if (!credentialId || !cpeTypeId || !hours || !deliveryMethod || !dateCompleted) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const newCredit = await pool.query(
      `INSERT INTO user_cpe_credits (user_id, credential_id, cpe_type_id, hours, delivery_method, date_completed) 
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [req.user.id, credentialId, cpeTypeId, hours, deliveryMethod, dateCompleted]
    );

    res.status(201).json({ message: "CPE credit added successfully!", credit: newCredit.rows[0] });
  } catch (err) {
    console.error("Error adding CPE credit:", err.message);
    res.status(500).json({ message: "Failed to add CPE credit." });
  }
});

// Fetch all CPE types
app.get("/api/cpe-types", async (req, res) => {
  try {
    const cpeTypes = await pool.query("SELECT id, name FROM cpe_types");
    res.status(200).json({ types: cpeTypes.rows });
  } catch (err) {
    console.error("Error fetching CPE types:", err.message);
    res.status(500).json({ message: "Failed to fetch CPE types." });
  }
});

// Fetch all CPE credits for a user
app.get("/api/cpe-credits", authenticateToken, async (req, res) => {
  try {
    const userCredits = await pool.query(
      `SELECT c.id, c.hours, c.delivery_method, c.date_completed, ct.name AS cpe_type, cr.name AS credential 
       FROM user_cpe_credits c
       JOIN cpe_types ct ON c.cpe_type_id = ct.id
       JOIN credentials cr ON c.credential_id = cr.id
       WHERE c.user_id = $1`,
      [req.user.id]
    );

    res.status(200).json({ credits: userCredits.rows });
  } catch (err) {
    console.error("Error fetching CPE credits:", err.message);
    res.status(500).json({ message: "Failed to fetch CPE credits." });
  }
});

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

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
