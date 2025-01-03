import React from "react";
import "../styles/home.css";

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to CPE Tracker</h1>
          <p>Track your credentials, log your CPE credits, and stay audit-ready.</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-heading">Features That Simplify Your CPE Tracking</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Track Credentials</h3>
            <p>Manage all your credentials in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Track CPE Credits</h3>
            <p>Log and categorize your activities with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Generate Reports</h3>
            <p>Stay audit-ready with detailed reporting tools.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
