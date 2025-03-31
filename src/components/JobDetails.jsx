import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams(); // Get Job ID from URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    fetch(`http://localhost/backend/get_job.php?id=${id}`) // Fetch specific job
      .then((response) => response.json())
      .then((data) => setJob(data))
      .catch((error) => console.error("Error fetching job details:", error));
  }, [id]);

  if (!job) return <p>Loading job details...</p>;

  return (
    <div className="job-details">
      <h2>{job.title}</h2>
      <h3>{job.company} - {job.location}</h3>
      <p>{job.description}</p>
      <button className="apply-btn">Apply Now</button>
    </div>
  );
};

export default JobDetails;
