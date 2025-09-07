import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import "./styles/style.css";

function App() {
  const [isRegistered, setIsRegistered] = useState(false);

  // Check if user is already registered (from localStorage)
  useEffect(() => {
    const registered = localStorage.getItem('userRegistered');
    if (registered === 'true') {
      setIsRegistered(true);
    }
  }, []);

  // Function to handle successful registration
  const handleRegistrationSuccess = () => {
    setIsRegistered(true);
    localStorage.setItem('userRegistered', 'true');
  };

  return (
    <div className="app-wrapper">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Routes */}
      <div className="page-wrapper">
        <Routes>
          {/* Redirect root to register if not registered, otherwise to dashboard */}
          <Route 
            path="/" 
            element={
              isRegistered ? <Home /> : <Navigate to="/register" replace />
            } 
          />
          <Route 
            path="/register" 
            element={
              isRegistered ? 
                <Navigate to="/dashboard" replace /> : 
                <Register onRegistrationSuccess={handleRegistrationSuccess} />
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              isRegistered ? <Home /> : <Navigate to="/register" replace />
            } 
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
