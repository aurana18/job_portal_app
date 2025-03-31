import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    navigate("/login"); 
  }; 

  return (
    <div className="logout-container">
      <div className="logout-box">
        <h2>You have been logged out</h2>
        <button className="logout-btn" onClick={handleLogout}>Login Again</button>
      </div>
    </div>
  );
};

export default Logout;
