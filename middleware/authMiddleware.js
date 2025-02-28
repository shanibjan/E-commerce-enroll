import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

// Protect routes
export const protect = async (req, res, next) => {
    try {
      const token = req.cookies.jwt;
      if (!token) return res.status(401).json({ message: "Not authorized, no token" });
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const admin = await Admin.findById(decoded.id).select("-password");
  
      if (!admin) return res.status(401).json({ message: "Admin not found" });
  
      req.admin = admin; // ✅ Set the admin properly
      next();
    } catch (error) {
      console.log("Auth Error:", error);
      res.status(401).json({ message: "Invalid Token" });
    }
  };
  

// Admin-only access
export const adminOnly = (req, res, next) => {
  if (req.admin && req.admin.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
