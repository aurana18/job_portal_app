import React from "react";
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
import "./App.css";


const Home = () => (
  <>
    <div className="content">
      <div className="job-cards">
        <JobListings />
      </div>
      <div className="search-bar-container">
        <SearchBar />
      </div>
    </div>
  </>
);

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/register" element={<Register />} />
        <Route path="/viewjobs" element={<ViewJobs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/post-job" element={<PostJobs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/activity" element={<Activity />} /> 
      </Routes>
    </Router>
  );
};

export default App;


