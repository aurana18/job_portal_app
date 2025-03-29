import React, { useEffect, useState } from "react";
import "./ViewJobs.css";
import { Link } from "react-router-dom";

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]); // Track applied jobs
  const [user, setUser] = useState(null); // Store logged-in user

  useEffect(() => {
    // Fetch jobs from backend
    fetch("http://localhost/backend/fetch_jobs.php")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));

    // Retrieve logged-in user from local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
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

  return (
    <div className="view-jobs-container">
      <h2>Find One-Time Jobs That Fit Your Skills</h2>
      <p>Browse short-term gigs and flexible side jobs. Apply today and get paid!</p>

      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs available at the moment.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-meta">
                <span>👜</span> {job.posted_by_name ? `Posted by ${job.posted_by_name}` : "Unknown"} &nbsp; | &nbsp;
                <span>📍</span> {job.location}
              </p>

              <p className="job-description">{job.description}</p>
              <p className="job-budget">
                <span>💵</span> {job.budget ? `$${job.budget}` : "Negotiable"}
              </p>

              <button
                className="apply-btn"
                onClick={() => handleApply(job.id)}
                disabled={appliedJobs.includes(job.id)}
              >
                {appliedJobs.includes(job.id) ? "Applied ✅" : "Apply Now"}
              </button>

              <Link to={`/job/${job.id}`} className="see-more-btn">See More</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewJobs;
