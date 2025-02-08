import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/Admin.js";
import connectDB from "../config/db.js";

dotenv.config();
connectDB();

const createAdmin = async () => {
  try {
    const email = "admin@example.com";
    const password = "admin123";

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, password: hashedPassword, role: "admin" });
    await newAdmin.save();

    console.log("✅ Admin created successfully");
    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error);
    process.exit(1);
  }
};

createAdmin();
