import React, { useState } from "react";
import "./Activity.css";
import { FaEnvelope, FaBriefcase, FaBell, FaUsers, FaUserTie } from "react-icons/fa";

const Activity = () => {
  const [filter, setFilter] = useState("all");

  const activities = [
    { id: 1, sender: "John", text: "Sent you a message: 'Are you available for a project?'", type: "message", time: "2h ago" },
    { id: 2, sender: "mark", text: "glass cleaner needed", type: "job-offer", time: "5h ago" },
    { id: 3, sender: "Jane ", text: "Requested to message with you.", type: "connection", time: "1d ago" },
    { id: 4, sender: "Aman", text: "Sent a job offer for patio clean", type: "job-offer", time: "2d ago" },
    { id: 5, sender: "Client A", text: "Sent a job request", type: "job-request", time: "3d ago" }
  ];

  const filteredActivities = filter === "all" ? activities : activities.filter((activity) => activity.type === filter);

  return (
    <div className="activity-page">
      
      {/* Left Sidebar */}
      <aside className="sidebar">
        <h3>Filters</h3>
        <button className={filter === "all" ? "active" : ""} onClick={() => setFilter("all")}>All Activity</button>
        <button className={filter === "message" ? "active" : ""} onClick={() => setFilter("message")}><FaEnvelope /> Messages</button>
        <button className={filter === "job-request" ? "active" : ""} onClick={() => setFilter("job-request")}><FaBriefcase /> Job Requests</button>
        <button className={filter === "job-offer" ? "active" : ""} onClick={() => setFilter("job-offer")}><FaBell /> Job Offers</button>
        <button className={filter === "connection" ? "active" : ""} onClick={() => setFilter("connection")}><FaUsers /> Connections</button>
      </aside>

      {/* Main Activity Feed */}
      <main className="activity-feed">
        <h2>Recent Activity</h2>
        {filteredActivities.length === 0 ? (
          <p className="no-activity">No activity found.</p>
        ) : (
          filteredActivities.map((activity) => (
            <div key={activity.id} className={`activity-card ${activity.type}`}>
              <div className="avatar">{activity.sender[0]}</div>
              <div className="activity-content">
                <strong>{activity.sender}</strong>
                <p>{activity.text}</p>
                <span className="timestamp">{activity.time}</span>
              </div>
            </div>
          ))
        )}
      </main>

      {/* Right Sidebar */}
      <aside className="right-sidebar">
        <h3>Upcoming jobs</h3>
        <div className="interview-card">
          <FaUserTie className="icon" />
          <p>mark - window clean</p>
          <span>Tomorrow at 10 AM</span>
        </div>
        <div className="interview-card">
          <FaUserTie className="icon" />
          <p>Aman - patio clean</p>
          <span>March 15 at 2 PM</span>
        </div>
        
        <h3>Job Alerts</h3>
        <div className="job-alert">
          <p>🚀 New job posted: window clean - bradford</p>
        </div>
        <div className="job-alert">
          <p>new job</p>
        </div>
      </aside>

    </div>
  );
};

export default Activity;
