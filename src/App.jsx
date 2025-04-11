import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SearchBar from "./components/homecomp/SearchBar";
import Footer from "./components/homecomp/Footer";
import Register from "./components/Register";
import ViewJobs from "./components/ViewJobs";
import PostJobs from "./components/PostJobs";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Activity from "./components/Activity";
import JobDetails from "./components/JobDetails";
import Login from "./components/Login";
import Logout from "./components/Logout";
import "./App.css";

const Home = () => (
  <div className="home-container">
    <div className="hero-section">
      <h1>Find Quick Side Jobs & Earn Fast 💸</h1>
      <p>One-time gigs, weekend hustles, and short-term jobs — all in one place.</p>
      <SearchBar />
    </div>

    <div className="introduction-section">
      <h2>Why Choose Our Platform?</h2>
      <ul className="benefits-list">
        <li>⚡ <strong>Instant Hiring</strong> – Get hired the same day</li>
        <li>🏡 <strong>Remote & Local</strong> – Find jobs that fit your lifestyle</li>
        <li>💵 <strong>Quick Pay</strong> – No long contracts, fast payments</li>
        <li>🔍 <strong>Smart Filters</strong> – Match with gigs based on skills & distance</li>
      </ul>
    </div>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/viewjobs" element={<ViewJobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/post-job" element={<PostJobs />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/logout" element={<Logout setUser={setUser} />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
