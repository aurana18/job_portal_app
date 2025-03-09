import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search keyword..." />
      <button>Go</button>
    </div>
  );
};

export default SearchBar;