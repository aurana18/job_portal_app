import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Job Portal</Link> 
      </div>

      <nav>
        <div className="header-content">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/viewjobs">View Jobs</Link></li>
            <li><Link to="/postjob">Post Job</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
