import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Generate JWT Token
const generateToken = (res, adminId) => {
    const token = jwt.sign({ id: adminId }, process.env.JWT_SECRET, { expiresIn: "7d" });
  
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, //  Secure only in production
      sameSite: "lax", //  Allows cross-origin authentication
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
  };
  
  

// Admin Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
  
    if (admin && (await bcrypt.compare(password, admin.password.toString()))) {
      generateToken(res, admin._id);
  
      console.log("Cookie Set:", res.getHeaders()['set-cookie']); //  Debugging line
  
      res.json({ id: admin._id, email: admin.email, role: admin.role ,token:res.getHeaders()['set-cookie'] });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
  

// Logout
router.post("/logout", (req, res) => {
  res.cookie("jwt", "", { httpOnly: true, expires: new Date(0) });
  res.json({ message: "Logged out" });
});

// Get Admin Profile (Protected)
router.get("/profile", protect, adminOnly, (req, res) => {
  res.json(req.admin);
});

// Admin Dashboard Access (Protected)
router.get("/dashboard", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome to Admin Dashboard" });
});

export default router;
