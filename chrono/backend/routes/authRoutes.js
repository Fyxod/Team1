// routes/authRoutes.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { protect } = require("../middleware/authMiddleware");
const authenticateToken = require("../middleware/authenticateToken");


const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const user = new User({ username, email, password: hashedPassword,role });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // true in production
      sameSite: "strict",
    });


    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;