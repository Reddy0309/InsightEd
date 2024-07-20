// backend/routes/userRoutes.js
import express from "express";
import User from "../models/reg.js";
import Register from "../models/reg.js";
import StuMentor from "../models/stumentor.js";
const router = express.Router();

// Create a new user
router.post("/register", async (req, res) => {
  const { usn, password } = req.body;
  if (!usn || !password) {
    return res.status(400).json({ message: "USN and password are required" });
  }
  try {
    const registerEntry = await Register.findOne({ usn, password });
    // Log the result of the query
    if (!registerEntry) {
      return res.status(401).json({ message: "USN or password incorrect" });
    }
    res.status(200).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { usn, password } = req.body;
  if (!usn || !password) {
    return res.status(400).json({ message: "USN and password are required" });
  }
  try {
    const registerEntry = await Register.findOne({ usn, password });
    // Log the result of the query
    if (!registerEntry) {
      return res.status(401).json({ message: "USN or password incorrect" });
    }
    const user = await StuMentor.findOne({ USN: usn });
    if (!user) {
      return res.status(404).json({ message: "User details not found" });
    }
    res.status(200).json({ message: "Registration successful", user });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to handle password change
router.post("/change-password", async (req, res) => {
  const { usn, password, newPassword } = req.body;
  try {
    // Find user by usn and current password
    let user = await Register.findOne({ usn, password });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    // Update password
    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.get("/studentDetails/:usn", async (req, res) => {
  const usn = req.params.usn;

  try {
    const student = await Register.findOne({ usn });
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json(student);
  } catch (error) {
    console.error("Error fetching student details:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
