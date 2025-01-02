import React from "react";
import { Link } from "react-router-dom";
import "./../styles/navbar.css";

function Navbar() {
  return (
    <nav>
      <div className="logo">CPE Tracker</div>
      <ul className="menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
