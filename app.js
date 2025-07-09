const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;
  console.log(`📥 Received message from ${name} (${email}): ${message}`);
  res.redirect("/");
});

module.exports = app; // export app for testing
