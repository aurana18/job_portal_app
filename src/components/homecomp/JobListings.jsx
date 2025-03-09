import React from "react";
import "./JobListings.css";

const jobs = [
  { title: "window cleaning", company: "matty cash", location: "bradford" },
  { title: "patio clean", company: "jamal", location: "bradford" },
  { title: "patio clean", company: "kareem ", location: "leeds" }
];

const JobListings = () => {
  return (
    <div className="job-listings">
      {jobs.map((job, index) => (
        <div key={index} className="job-box">
          <h3>{job.title}</h3>
          <p>{job.company}</p>
          <p>{job.location}</p>
          <button className="apply-button">Apply Now</button>
        </div>
      ))}
    </div>
  );
};

export default JobListings;