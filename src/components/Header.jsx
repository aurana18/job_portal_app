import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo"></div>
      <nav>
        <div className="header-content">
          <ul>
            <li>Home</li>
            <li>view jobs</li>
            <li>Contact</li>
            <li>about</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;