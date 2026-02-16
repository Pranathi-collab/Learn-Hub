require("dotenv").config();
const express = require("express");
const cors = require("cors");


const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173"
}));

// Test route
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
