import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear(); // Get the current year dynamically

  return (
    <footer style={{ textAlign: "center", padding: "1rem", backgroundColor: "#f4f4f4" }}>
      <p>&copy; {currentYear} CPE Tracker. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
