import React from 'react';
import '../styles/footer.css'; // Correct the import path

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p>&copy; {currentYear} CPE Tracker. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
