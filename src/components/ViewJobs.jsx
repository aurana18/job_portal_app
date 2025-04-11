import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewJobs.css";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    distance: "",
    category: "",
    minBudget: "",
    maxBudget: "",
  });

  useEffect(() => {
    fetch("http://localhost/backend/fetch_jobs.php")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleApply = async (jobId) => {
    if (!user) {
      alert("Please log in to apply for jobs.");
      return;
    }

    const applicationData = { user_id: user.id, job_id: jobId };

    try {
      const response = await fetch("http://localhost/backend/apply_job.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      const data = await response.json();

      if (data.success) {
        alert("Application submitted successfully!");
        setAppliedJobs([...appliedJobs, jobId]);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Server error. Please try again later.");
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(search.toLowerCase());
    const matchesLocation = filters.location === "" || job.location.toLowerCase().includes(filters.location.toLowerCase());
    const matchesBudget =
      (!filters.minBudget || Number(job.budget) >= Number(filters.minBudget)) &&
      (!filters.maxBudget || Number(job.budget) <= Number(filters.maxBudget));

    return matchesSearch && matchesLocation && matchesBudget;
  });

  return (
    <div className="view-jobs-container">
      <h2>Find One-Time Jobs That Fit Your Skills</h2>
      <p>Browse short-term gigs and flexible side jobs. Apply today and get paid!</p>

      <div className="search-filter-box">
        <input
          type="text"
          placeholder="Search jobs (e.g. Web Developer)"
          value={search}
          onChange={handleSearch}
          className="search-input"
        />

        <div className="filters">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
          <select name="distance" value={filters.distance} onChange={handleFilterChange}>
            <option value="">Distance</option>
            <option value="5">Within 5km</option>
            <option value="10">Within 10km</option>
            <option value="25">Within 25km</option>
            <option value="50">Within 50km</option>
          </select>
          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">Category</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="Writing">Writing</option>
          </select>
          <input
            type="number"
            name="minBudget"
            placeholder="Min Budget"
            value={filters.minBudget}
            onChange={handleFilterChange}
          />
          <input
            type="number"
            name="maxBudget"
            placeholder="Max Budget"
            value={filters.maxBudget}
            onChange={handleFilterChange}
          />
        </div>
      </div>

      {filteredJobs.length === 0 ? (
        <p className="no-jobs">No jobs match your search or filters.</p>
      ) : (
        <div className="job-grid">
          {filteredJobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-card-header">
                <h3 className="job-title">{job.title}</h3>
                <div className="job-tags">
                  {job.job_type && <span className="badge badge-type">{job.job_type}</span>}
                  {job.urgency && <span className="badge badge-urgent">{job.urgency}</span>}
                </div>
              </div>

              <p className="job-meta">
                📍 {job.location} &nbsp;|&nbsp; 👜 Posted by {job.posted_by_name || "Unknown"}
              </p>

              <p className="job-description">
                {job.description.length > 120
                  ? `${job.description.slice(0, 120)}...`
                  : job.description}
              </p>

              <p className="job-budget">💵 {job.budget ? `£${job.budget}` : "Negotiable"}</p>

              <div className="job-card-actions">
                <button
                  className="apply-btn"
                  onClick={() => handleApply(job.id)}
                  disabled={appliedJobs.includes(job.id)}
                >
                  {appliedJobs.includes(job.id) ? "✅ Applied" : "Apply Now"}
                </button>
                <Link to={`/job/${job.id}`} className="see-more-btn">See More</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewJobs;
