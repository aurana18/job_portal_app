import React, { useState } from "react";
import "./Profile.css";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: "Name",
    email: "email@example.com",
    phone: "+1 234 567 890",
    location: "location",
    bio: "bio",
  });

  const [newUserData, setNewUserData] = useState({ ...user });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setUser({ ...newUserData });
    setIsEditing(false);
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img
          src="https://via.placehohttps://as2.ftcdn.net/v2/jpg/00/64/67/63/1000_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpglder.com/120"
          alt="Profile"
          className="profile-pic"
        />
        {isEditing ? (
          <input type="text" name="name" value={newUserData.name} onChange={handleChange} />
        ) : (
          <h2>{user.name}</h2>
        )}
        <button className="edit-btn" onClick={handleEditClick}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
      </div>

      <div className="profile-info">
        <p><strong>Email:</strong> {isEditing ? <input type="email" name="email" value={newUserData.email} onChange={handleChange} /> : user.email}</p>
        <p><strong>Phone:</strong> {isEditing ? <input type="tel" name="phone" value={newUserData.phone} onChange={handleChange} /> : user.phone}</p>
        <p><strong>Location:</strong> {isEditing ? <input type="text" name="location" value={newUserData.location} onChange={handleChange} /> : user.location}</p>
        <p><strong>Bio:</strong> {isEditing ? <textarea name="bio" value={newUserData.bio} onChange={handleChange} /> : user.bio}</p>
      </div>

      {isEditing && (
        <button className="save-btn" onClick={handleSave}>Save</button>
      )}

      <div className="profile-section">
        <h3>Saved Jobs</h3>
        <ul>
          <li>previous jobs</li>
          <li>previous jobs</li>
        </ul>
      </div>

      <div className="profile-section">
        <h3>Rating</h3>
        <ul>
          <li>Last job rating</li>
          <li>Average job rating</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
