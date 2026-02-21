const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const courseRoutes = require("./routes/courseRoutes");

app.use("/api", courseRoutes);

app.use("/uploads", express.static("uploads"));
const uploadsDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(uploadsDir));


app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// Routes
app.use("/api/user", require("./routers/userRoutes"));
app.use("/api/admin", require("./routers/adminRouter"));

// FORCE binding
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
