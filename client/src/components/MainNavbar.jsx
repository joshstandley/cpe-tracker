import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css'; // Correct the import path

const MainNavbar = () => {
  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">CPE Tracker</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
      </ul>
    </nav>
  );
};

export default MainNavbar;
