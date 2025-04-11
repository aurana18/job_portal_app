import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ViewJobs from "./components/ViewJobs";
import PostJobs from "./components/PostJobs";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Activity from "./components/Activity";
import JobDetails from "./components/JobDetails";
import Logout from "./components/Logout";
import "./App.css";

const Sidebar = ({ isOpen, toggleSidebar }) => (
  <div className={`sidebar ${isOpen ? "open" : ""}`}>
    <div className="sidebar-header">Job Portal</div>
    <nav className="sidebar-nav">
      <Link to="/" onClick={toggleSidebar}>Home</Link>
      <Link to="/login" onClick={toggleSidebar}>Login</Link>
      <Link to="/register" onClick={toggleSidebar}>Register</Link>
      <Link to="/view-jobs" onClick={toggleSidebar}>View Jobs</Link>
      <Link to="/post-jobs" onClick={toggleSidebar}>Post Jobs</Link>
      <Link to="/profile" onClick={toggleSidebar}>Profile</Link>
      <Link to="/contact" onClick={toggleSidebar}>Contact</Link>
      <Link to="/logout" onClick={toggleSidebar}>Logout</Link>
    </nav>
  </div>
);

const Home = () => (
  <div className="home-container">
    <h1 className="hero-title">Find Quick Side Jobs & Earn Fast! 💰</h1>
    <p className="hero-subtitle">Get hired for one-time gigs, short-term tasks, and freelance work in your area.</p>
    <input type="text" placeholder="Search for jobs..." className="search-input" />
  </div>
);

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <Router>
      <div className="app-wrapper">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <button className="menu-btn" onClick={toggleSidebar}>
            ☰ Menu
          </button>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/view-jobs" element={<ViewJobs />} />
            <Route path="/post-jobs" element={<PostJobs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/job-details" element={<JobDetails />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
