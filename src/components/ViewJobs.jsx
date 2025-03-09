import React, { useState } from "react";
import "./ViewJobs.css";

const jobListings = [
  {
    id: 1,
    title: "job",
    name: "",
    location: "",
    duration: "",
    description: "",
    budget: "",
    datePosted: "",
  },
  {
    id: 2,
    title: "job",
    name: "",
    location: "",
    duration: "",
    description: "",
    budget: "",
    datePosted: "",
  },
  {
    id: 3,
    title: "job",
    name: "",
    location: "",
    duration: "",
    description: "",
    budget: "",
    datePosted: "",
  },
  {
    id: 4,
    title: "job",
    name: "",
    location: "",
    duration: "",
    description: "",
    budget: "",
    datePosted: "",
  },
];

const ViewJobs = () => {
  const [search, setSearch] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobListings);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredJobs(
      jobListings.filter(
        (job) =>
          job.title.toLowerCase().includes(value) ||
          job.company.toLowerCase().includes(value) ||
          job.location.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="jobs-container">
      <h1>Find Your Next Job</h1>
      
      <input
        type="text"
        placeholder="Search for jobs, companies, or locations..."
        value={search}
        onChange={handleSearch}
        className="search-input"
      />

      <div className="job-list">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <h2>{job.title}</h2>
              <p className="company">{job.company} - {job.location}</p>
              <p><strong>Type:</strong> {job.type}</p>
              <p><strong>Salary:</strong> {job.salary}</p>
              <p><strong>Date Posted:</strong> {job.datePosted}</p>
              <p className="description">{job.description}</p>
              <button className="apply-btn">Apply Now</button>
            </div>
          ))
        ) : (
          <p className="no-jobs">No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default ViewJobs;
