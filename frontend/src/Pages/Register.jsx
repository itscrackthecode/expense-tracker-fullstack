import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register({ onRegistrationSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert("Please fill in all fields");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Here you would normally make an API call to your backend
      // For now, we'll simulate a successful registration
      
      alert(`Welcome ${username}! Registration successful.`);
      
      // Call the success handler from App.jsx
      onRegistrationSuccess();
      
      // Navigate to dashboard
      navigate("/dashboard");
      
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h2>
            <span className="register-icon">👋</span>
            Welcome to ExpenseTracker
          </h2>
          <p>Please register to start tracking your expenses</p>
        </div>
        
        <form onSubmit={handleRegister} className="register-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className="register-button"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner">⏳</span>
                Registering...
              </>
            ) : (
              <>
                <span className="button-icon">🚀</span>
                Get Started
              </>
            )}
          </button>
        </form>
        
        <div className="register-footer">
          <p>Already have an account? You can proceed to dashboard after registration.</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
