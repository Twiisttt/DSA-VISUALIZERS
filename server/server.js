const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();
const progressRoutes = require("./routes/progressRoutes");

const app = express();

const PORT = process.env.PORT || 5000;


// ================================
// MIDDLEWARE
// ================================

app.use(cors());
app.use(express.json());


// ================================
// ROUTES
// ================================

app.use("/api/auth", authRoutes);
app.use("/api/progress", progressRoutes);


// Test API
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "DSA Visualizer backend is running"
  });
});


// ================================
// CONNECT DATABASE + START SERVER
// ================================

async function startServer() {
  try {

    // Connect to MongoDB first
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");


    // Start Express only after MongoDB connects
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {

    console.error(
      "MongoDB connection error:",
      error.message
    );

  }
}


startServer();