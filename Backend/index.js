const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 4005;

// Middleware

app.use(cors());
app.use(express.json());

// Import routes
const userRoutes = require("./routes/useRoutes");
const heroRoutes = require("./routes/heroRoutes");

// Home route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

// API routes
app.use("/api", userRoutes);
app.use("/api", heroRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
