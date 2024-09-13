import express from "express";
import User from "../models/User.js"; // Use default import

const router = express.Router();

router.post("/create", async (req, res, next) => {
  const { name, location, email, password } = req.body;

  // Check if all required fields are provided
  if (!name || !location || !email || !password) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const user = new User({ name, location, email, password });
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
