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

app.locals.pool = pool;

// Routes
app.use("/api/register", require("./routes/register"));
app.use("/api/login", require("./routes/login"));
app.use("/api/dashboard", require("./routes/dashboard"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/cpe_activities", require("./routes/cpe_activities")); // Add CPE activities route

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
