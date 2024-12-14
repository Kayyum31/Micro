const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files (HTML/JS)

// MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "Owaish", // Replace with your MySQL username
  password: "@Owaish31", // Replace with your MySQL password
  database: "Contact", // Replace with your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// API Endpoint to Handle Contact Form Submission
app.post("/submit-contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validate input
  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";
  db.query(query, [name, email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Database error", details: err });
    }
    res.status(200).json({ message: "Message saved successfully." });
  });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
