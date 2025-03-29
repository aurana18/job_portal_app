import React, { useEffect, useState } from "react";
import "./Activity.css";

const Activity = () => {
  const [user, setUser] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [postedJobs, setPostedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchContacts(storedUser.id);
      fetchPostedJobs(storedUser.id);
      fetchAppliedJobs(storedUser.id);
    }
  }, []);

  const fetchContacts = async (userId) => {
    try {
      const response = await fetch(`http://localhost/backend/fetch_contacts.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) setContacts(data.users);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const fetchPostedJobs = async (userId) => {
    try {
      const response = await fetch(`http://localhost/backend/fetch_user_jobs.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) setPostedJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching posted jobs:", error);
    }
  };

  const fetchAppliedJobs = async (userId) => {
    try {
      const response = await fetch(`http://localhost/backend/fetch_applied_jobs.php?user_id=${userId}`);
      const data = await response.json();
      if (data.success) setAppliedJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    if (user && receiver) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 3000);
      return () => clearInterval(interval);
    }
  }, [receiver]);

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost/backend/fetch_messages.php?sender_id=${user.id}&receiver_id=${receiver.id}`);
      const data = await response.json();
      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;

    try {
      const response = await fetch("http://localhost/backend/send_message.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender_id: user.id, receiver_id: receiver.id, message }),
      });

      const data = await response.json();
      if (data.success) {
        setMessages([...messages, { sender_id: user.id, message }]);
        setMessage("");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="activity-container">
      <h2>Activity Dashboard</h2>
      <div className="section">
        <h3>Posted Jobs</h3>
        {postedJobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          <ul>
            {postedJobs.map((job) => (
              <li key={job.id}>{job.title} - {job.status}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="section">
        <h3>Jobs You Applied For</h3>
        {appliedJobs.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          <ul>
            {appliedJobs.map((job) => (
              <li key={job.id}>{job.title} - {job.status}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="chat-section">
        <h3>Messages</h3>
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact.id} className="contact" onClick={() => setReceiver(contact)}>
              {contact.name}
            </div>
          ))}
        </div>
        {receiver && (
          <div className="chat-box">
            <h4>Chat with {receiver.name}</h4>
            <div className="messages">
              {messages.map((msg, index) => (
                <p key={index} className={msg.sender_id === user.id ? "my-message" : "their-message"}>
                  <strong>{msg.sender_id === user.id ? "You" : receiver.name}:</strong> {msg.message}
                </p>
              ))}
            </div>
            <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message..." />
            <button onClick={sendMessage}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;

