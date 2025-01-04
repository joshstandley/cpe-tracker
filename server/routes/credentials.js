const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const credentialsResult = await req.app.locals.pool.query(
      "SELECT * FROM credentials"
    );

    res.status(200).json(credentialsResult.rows);
  } catch (err) {
    console.error("Credentials error:", err.message);
    res.status(500).json({ message: "Server error during credentials access." });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { abbreviation, full_name, description, organization_id, website, min_credits_per_year, renewal_cycle_years, total_credits_per_cycle, requires_ethics, other_requirements } = req.body;

  try {
    await req.app.locals.pool.query(
      "INSERT INTO credentials (abbreviation, full_name, description, organization_id, website, min_credits_per_year, renewal_cycle_years, total_credits_per_cycle, requires_ethics, other_requirements) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",
      [abbreviation, full_name, description, organization_id, website, min_credits_per_year, renewal_cycle_years, total_credits_per_cycle, requires_ethics, other_requirements]
    );

    res.status(201).json({ message: "Credential added successfully!" });
  } catch (err) {
    console.error("Credential add error:", err.message);
    res.status(500).json({ message: "Server error during credential add." });
  }
});

module.exports = router;
