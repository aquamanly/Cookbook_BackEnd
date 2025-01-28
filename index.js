const http = require("http"); // For optional custom HTTP handling
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect Database
connectDB();

// Define Routes
app.use("/api/recipes", require("./routes/Recipes"));

// Create the Express server
const server = http.createServer(app);

// Define a basic route for root (optional)
app.get("/", (req, res) => {
  res.send("Welcome to the Recipes API!");
});

// Start Server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Server running on port ${PORT} dudes`));
