const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Allow requests from React (localhost:3000)
app.use(cors({
  origin: "http://localhost:3000",
  methods: ["POST", "GET"],
  credentials: true
}));

app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Default user for XAMPP
  password: "", // Keep empty if no password is set
  database: "job_portal"
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ MySQL Connection Failed:", err);
    return;
  }
  console.log("✅ MySQL Connected...");
});

// API Route to Register Users
app.post("/register", (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  const sql = "INSERT INTO users (fullName, email, phone, password) VALUES (?, ?, ?, ?)";

  db.query(sql, [fullName, email, phone, password], (err, result) => {
    if (err) {
      console.error("❌ Error inserting user:", err);
      return res.status(500).json({ message: "Error registering user" });
    }
    res.json({ message: "✅ User Registered Successfully!" });
  });
});

// Start Server
app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});