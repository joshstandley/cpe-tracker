import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload(); // Reload to update the navbar
  };

  return (
    <nav>
      <div className="navbar-logo">
        <Link to="/">CPE Tracker</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><Link to="/cpe_tracker">CPE Tracker</Link></li>
        <li><Link to="/credentials">Credentials</Link></li>
        <li><button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
