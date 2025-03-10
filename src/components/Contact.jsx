import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
      setSubmitted(true);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <p>Have any questions? We'd love to hear from you!</p>

        {submitted ? (
          <div className="success-message">✅ Thank you! We'll get back to you soon.</div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="input-group">
              <label>Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Write your message here"
              />
              {errors.message && <p className="error">{errors.message}</p>}
            </div>

            <button type="submit" className="contact-btn">Send Message</button>
          </form>
        )}
      </div>

      {/* Business Info */}
      <div className="contact-info">
        <h3>📍 Our Office</h3>
        <p>123 JobStreet, New York, NY 10001</p>
        <h3>📧 Email</h3>
        <p>support@jobportal.com</p>
        <h3>📞 Phone</h3>
        <p>(123) 456-7890</p>
      </div>
    </div>
  );
};

export default Contact;
