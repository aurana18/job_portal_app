import React, { useEffect, useState } from "react";
import "./Chat.css";

const Chat = ({ userId, receiverId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(
          `http://localhost/backend/fetch_messages.php?sender_id=${userId}&receiver_id=${receiverId}`
        );
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 2000); // Polling every 2 seconds
    return () => clearInterval(interval);
  }, [userId, receiverId]);

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = { sender_id: userId, receiver_id: receiverId, message: newMessage };
    try {
      await fetch("http://localhost/backend/send_message.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(messageData),
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender_id === userId ? "sent" : "received"}`}>
            <p>{msg.message}</p>
            <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
          </div>
        ))}
      </div>

      <div className="input-container">
        {typing && <p className="typing-indicator">User is typing...</p>}
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          onFocus={() => setTyping(true)}
          onBlur={() => setTyping(false)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
