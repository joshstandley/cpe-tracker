import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CpeTracker from './pages/CpeTracker';
import Credentials from './pages/Credentials';
import MainNavbar from './components/MainNavbar';
import UserNavbar from './components/UserNavbar';
import Footer from './components/Footer';
import './styles/global.css';
import './styles/navbar.css'; // Import navbar styles
import './styles/footer.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <Router>
      <div className="app-container">
        <header>
          {isLoggedIn ? <UserNavbar /> : <MainNavbar />}
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cpe_tracker" element={<CpeTracker />} />
            <Route path="/credentials" element={<Credentials />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
