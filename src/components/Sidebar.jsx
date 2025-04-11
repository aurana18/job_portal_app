import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">JobBoard</h2>
      <nav className="sidebar-nav">
        <Link to="/">🏠 Home</Link>
        <Link to="/viewjobs">🔍 View Jobs</Link>
        <Link to="/post-job">➕ Post Job</Link>
        <Link to="/profile">👤 Profile</Link>
        <Link to="/activity">📊 Activity</Link>
        <Link to="/contact">✉️ Contact</Link>

        {/* Conditionally show Login/Logout */}
        {!isLoggedIn ? (
          <Link to="/login">🔐 Login</Link> // If logged out, show Login
        ) : (
          <a href="#" onClick={handleLogout}>🚪 Logout</a> // If logged in, show Logout
        )}

        <Link to="/register">📝 Register</Link> {/* Always show Register */}
      </nav>
    </div>
  );
};

export default Sidebar;
