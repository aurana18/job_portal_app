import React, { useState } from "react";
import "./PostJobs.css"; 

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    name: "",  
    location: "",
    description: "",
    budget: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch("http://localhost/backend/post_job.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    const data = await response.json();
    alert(data.message);
  };
  
  
  
  
  
  
  return (
    <div className="post-job-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="post-job-form">
        <input type="text" name="title" placeholder="Job Title" onChange={handleChange} required />
        <input type="text" name="name" placeholder="Name" onChange={handleChange} required />  
        <input type="text" name="location" placeholder="Location" onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" onChange={handleChange} required></textarea>
        <input type="text" name="budget" placeholder="Budget" onChange={handleChange} />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
  
};

export default PostJob;
