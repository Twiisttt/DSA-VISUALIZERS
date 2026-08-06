const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ======================================================
// REGISTER USER
// POST /api/auth/register
// ======================================================

router.post("/register", async (req, res) => {
  try {

    // Get data sent by frontend/Postman
    const { name, email, password } = req.body;


    // Check if all fields are provided
    if (!name || !email || !password) {

      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });

    }


    // Check if user already exists
    const existingUser = await User.findOne({ email });


    if (existingUser) {

      return res.status(400).json({
        success: false,
        message: "User with this email already exists"
      });

    }


    // Hash password before storing it
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // Create new user in MongoDB
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });


    // Successful registration response
    res.status(201).json({

      success: true,

      message: "User registered successfully",

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });


  } catch (error) {

    console.error("Registration error:", error);


    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});


// ======================================================
// LOGIN USER
// POST /api/auth/login
// ======================================================

router.post("/login", async (req, res) => {
  try {

    // Get email and password
    const { email, password } = req.body;


    // Check required fields
    if (!email || !password) {

      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });

    }


    // Find user in MongoDB
    const user = await User.findOne({ email });


    // User does not exist
    if (!user) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });

    }


    // Compare entered password with stored hash
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );


    // Password incorrect
    if (!isPasswordCorrect) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });

    }


    // Generate JWT token
    const token = jwt.sign(

      {
        userId: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );


    // Successful login
    res.status(200).json({

      success: true,

      message: "Login successful",

      token,

      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }

    });


  } catch (error) {

    console.error("Login error:", error);


    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
});


// ======================================================
// GET LOGGED-IN USER PROFILE
// GET /api/auth/profile
// PROTECTED ROUTE
// ======================================================

router.get(
  "/profile",

  // JWT must pass through this middleware first
  authMiddleware,

  async (req, res) => {

    try {

      // req.userId was added by authMiddleware
      const user = await User
        .findById(req.userId)
        .select("-password");


      // User no longer exists
      if (!user) {

        return res.status(404).json({
          success: false,
          message: "User not found"
        });

      }


      // Return user profile
      res.status(200).json({

        success: true,

        user

      });


    } catch (error) {

      console.error("Profile error:", error);


      res.status(500).json({
        success: false,
        message: "Server error"
      });

    }

  }
);


module.exports = router;