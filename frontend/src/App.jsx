import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./components/Dashboard.jsx";
import "./styles/style.css";

function App() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Quick links under navbar */}
      <nav className="navbar-links">
        <Link className="navbar-link" to="/">Home</Link>
        <Link className="navbar-link" to="/register">Register</Link>
        <Link className="navbar-link" to="/dashboard">Dashboard</Link>
      </nav>

      {/* Page Content */}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
