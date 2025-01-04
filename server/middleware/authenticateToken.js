const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  console.log("authenticateToken middleware executed");
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied. Token missing." });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;