const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Pool } = require("pg");

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

// Attach the pool to the app for use in routes
app.locals.pool = pool;

// Import routes
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");

// Route setup
app.use("/api/register", registerRoute);
app.use("/api/login", loginRoute);

// Health check for debugging
app.get("/api/db-test", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.status(200).json({ message: "Database connection successful", result: result.rows });
    } catch (error) {
        console.error("Database connection error:", error);
        res.status(500).json({ message: "Database connection error", error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
