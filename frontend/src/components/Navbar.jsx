import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    const registered = localStorage.getItem('userRegistered');
    if (registered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userRegistered');
    setIsRegistered(false);
    window.location.href = '/register';
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="brand-icon">💰</div>
          <h1 className="brand-text">ExpenseTracker</h1>
        </div>
        
        <div className="navbar-links">
          {isRegistered ? (
            <>
              <Link 
                to="/dashboard" 
                className={`nav-link ${location.pathname === '/dashboard' || location.pathname === '/' ? 'active' : ''}`}
              >
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="nav-link logout-button"
              >
                <span className="nav-icon">🚪</span>
                Logout
              </button>
            </>
          ) : (
            <Link 
              to="/register" 
              className={`nav-link ${location.pathname === '/register' ? 'active' : ''}`}
            >
              <span className="nav-icon">👤</span>
              Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
