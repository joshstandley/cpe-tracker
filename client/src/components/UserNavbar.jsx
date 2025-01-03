import React from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css";

function UserNavbar({ onLogout }) {
  return (
    <nav>
      <div className="logo">CPE Tracker</div>
      <ul className="menu">
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/" onClick={onLogout}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default UserNavbar;
