import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import adminRoute from './routes/adminRoute.js';
import cors from 'cors';
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import productRoute from "./routes/productRoute.js";

const app = express();

dotenv.config();
connectDB();

// CORS configuration for requests with credentials
app.use(
  cors({
    origin: "http://localhost:3000", // ✅ Ensure this matches frontend URL
    credentials: true, // ✅ Allows cookies
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Set-Cookie"], // ✅ Include Set-Cookie
  })
);


app.use(express.json());
app.use(cookieParser());

// ✅ Define API routes first
app.use('/api/admin', adminRoute);
app.use("/api/products", productRoute);

// ✅ Serve static frontend **after API routes**



const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
