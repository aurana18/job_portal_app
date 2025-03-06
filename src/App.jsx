import React from "react";
import Header from "./components/Header";
import JobListings from "./components/JobListings";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import "./App.css";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <JobListings />
      <div className="content">
        <SearchBar />
      </div>
      <Footer />
    </div>
  );
};

export default App;

