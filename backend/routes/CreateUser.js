import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { name, location, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !location || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({ name, location, email, password: secPassword });
    await user.save();

    // Create JWT token
    const token = jwt.sign(
      { id: user._id }, // Payload: user ID
      process.env.JWT_SECRET, // Secret key (should be in your .env file)
      { expiresIn: "1h" } // Token expiration time
    );

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token, // Return the token
    });
  } catch (error) {
    next(error);
  }
});

export default router;
