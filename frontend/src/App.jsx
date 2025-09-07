import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./Pages/Home.jsx";
import Register from "./Pages/Register.jsx";
import "./styles/style.css";

function App() {
  return (
    <div className="app-wrapper">
      {/* Navbar always visible */}
      <Navbar />

      {/* Page Routes */}
      <div className="page-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
