import React from "react";
import { Link } from "react-router-dom";
import "../styles/home.css";  // Assuming we create a home.css file for styling

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-content">
        <h1>Welcome to CPE Tracker</h1>
        <p>Your personal assistant for managing Continuing Professional Education (CPE) credits.</p>
        <Link to="/register">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
