import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ display: "flex", justifyContent: "space-between", padding: "1rem", backgroundColor: "#f8f9fa", borderBottom: "1px solid #ddd" }}>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
        CPE Tracker
      </div>
      <div>
        <Link to="/" style={{ marginRight: "1rem", textDecoration: "none", color: "#333" }}>
          Home
        </Link>
        <Link to="/register" style={{ marginRight: "1rem", textDecoration: "none", color: "#333" }}>
          Register
        </Link>
        <Link to="/login" style={{ textDecoration: "none", color: "#333" }}>
          Login
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
