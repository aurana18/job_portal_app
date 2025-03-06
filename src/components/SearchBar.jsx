import React from "react";
import "./SearchBar.css";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search jobs..." />
      <button>Go</button>
    </div>
  );
};

export default SearchBar;