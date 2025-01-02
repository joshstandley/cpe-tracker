import React from "react";
import "../styles/footer.css";

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer>
      <div className="footer-left">
        <p>&copy; {currentYear} CPE Tracker. All rights reserved.</p>
      </div>
      <div className="footer-right">
        <p>
          <a href="/privacy">Privacy Policy</a>
        </p>
        <p>
          <a href="/terms">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
