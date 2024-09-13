import express from "express";
import User from "../models/User.js"; // Import your User model

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    // If no user is found or the password doesn't match
    if (!user || user.password !== password) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    // Successful login
    return res.status(200).json({ success: true, message: "Login successful", user });
  } catch (error) {
    // Handle any server errors
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
