import React, { useState } from "react";
import "./PostJobs.css";

const PostJobs = () => {
  const [formData, setFormData] = useState({
    title: "",
    Name: "",
    location: "",
    budget: "",
    jobType: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.company.trim()) newErrors.company = "Company name is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required";
    if (!formData.jobType.trim()) newErrors.jobType = "Job type is required";
    if (!formData.description.trim()) newErrors.description = "Job description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Job Posted:", formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="post-job-container">
      <div className="post-job-box">
        <h2>Post a Job</h2>
        <p>Fill in the details to post a new job opportunity</p>

        {submitted ? (
          <div className="success-message">✅ Job posted successfully!</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter job title"
              />
              {errors.title && <p className="error">{errors.title}</p>}
            </div>

            <div className="input-group">
              <label>Company Name</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Enter company name"
              />
              {errors.company && <p className="error">{errors.company}</p>}
            </div>

            <div className="input-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter job location"
              />
              {errors.location && <p className="error">{errors.location}</p>}
            </div>

            <div className="input-group">
              <label>Salary ($)</label>
              <input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="Enter salary"
              />
              {errors.salary && <p className="error">{errors.salary}</p>}
            </div>

            <div className="input-group">
              <label>Job Type</label>
              <select name="jobType" value={formData.jobType} onChange={handleChange}>
                <option value="">Select job type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              {errors.jobType && <p className="error">{errors.jobType}</p>}
            </div>

            <div className="input-group">
              <label>Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter job description"
              />
              {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <button type="submit" className="post-job-btn">Post Job</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PostJobs;
