import React, { useState, useEffect } from "react";
import "./PostJobs.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    description: "",
    budget: "",
  });

  const [user, setUser] = useState(null);

  
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) setUser(storedUser);
    } catch (error) {
      console.error("Error loading user from localStorage:", error);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to post a job.");
      return;
    }

    const jobData = { ...formData, posted_by: user.id }; // Add posted_by field

    try {
      const response = await fetch("http://localhost/backend/post_job.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(jobData),
      });

      if (!response.ok) throw new Error("Server error. Please try again.");

      const data = await response.json();
      alert(data.message);

     
      setFormData({
        title: "",
        location: "",
        description: "",
        budget: "",
      });
    } catch (error) {
      console.error("Error submitting job:", error);
      alert("Failed to post job. Please try again later.");
    }
  };

  return (
    <div className="post-job-container">
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit} className="post-job-form">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="budget"
          placeholder="Budget"
          value={formData.budget}
          onChange={handleChange}
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
};

export default PostJob;
