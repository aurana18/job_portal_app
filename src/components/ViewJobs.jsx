import React, { useEffect, useState } from "react";
import "./ViewJobs.css";
import { Link } from "react-router-dom"; 
import { Briefcase, MapPin, DollarSign } from "lucide-react"; 

const ViewJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [expandedJob, setExpandedJob] = useState(null); // Track which job description is expanded

  useEffect(() => {
    fetch("http://localhost/backend/fetch_jobs.php")
      .then((response) => response.json())
      .then((data) => setJobs(data))
      .catch((error) => console.error("Error fetching jobs:", error));
  }, []);

  const toggleDescription = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="view-jobs-container">
      <h2>Find Your Next Opportunity</h2>
      <p>Browse the latest job listings and apply today.</p>
      
      {jobs.length === 0 ? (
        <p className="no-jobs">No jobs available at the moment.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3 className="job-title">{job.title}</h3>
              <p className="job-meta">
                <Briefcase size={18} /> {job.name} &nbsp; | &nbsp;
                <MapPin size={18} /> {job.location}
              </p>
              
              {/* Conditionally display the full description */}
              <p className="job-description">
                {expandedJob === job.id ? job.description : `${job.description.substring(0, 100)}...`}
              </p>

              <button className="see-more-btn" onClick={() => toggleDescription(job.id)}>
                {expandedJob === job.id ? "See Less" : "See More"}
              </button>

              <p className="job-budget">
                <DollarSign size={18} /> {job.budget ? `$${job.budget}` : "Negotiable"}
              </p>
              <Link to={`/job/${job.id}`} className="apply-btn">Apply Now</Link> 
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewJobs;

