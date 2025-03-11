import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import JobListings from "./components/JobListings";
import SearchBar from "./components/SearchBar";
import Footer from "./components/Footer";
import Register from "./components/Register"; 
import "./App.css";


const Home = () => (
  <div className="page-container">
    <Header />
    <div className="content">
      <JobListings />
      <SearchBar />
    </div>
    <Footer />
  </div>
);


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
};

export default App;


