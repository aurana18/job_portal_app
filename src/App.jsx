
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/homecomp/Header";
import JobListings from "./components/homecomp/JobListings";
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
  <>
    <div className="home-container">
      <div className="hero-section">
        <h1>Find Quick Side Jobs & Earn Fast! 💰</h1>
        <p>Get hired for one-time gigs, short-term tasks, and freelance work in your area.</p>
        <SearchBar />
      </div>
      
      <div className="introduction-section">
        <h2>📢 Need Extra Cash? We've Got You Covered!</h2>
        <p>Whether you're looking for a quick gig, a weekend job, or a short-term side hustle, we connect you with people who need your skills.</p>
        <ul>
          <li>⚡ **Instant Hiring** – Find quick jobs that fit your schedule</li>
          <li>🏡 **Local & Remote Gigs** – Work from home or in your neighborhood</li>
          <li>💵 **Get Paid Fast** – No long contracts, just quick cash!</li>
        </ul>
      </div>
    </div>
  </>
);


const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <Header />
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
    </Router>
  );
};

export default App;