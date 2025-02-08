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
    origin: "http://localhost:3000", // Specify frontend URL
    credentials: true, // Allow credentials (cookies)
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

// Admin routes
app.use('/api/admin', adminRoute);
app.use("/api/products", productRoute);

// Serve static files (React build folder)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

// Serve the index.html file for any unknown paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server running successfully on ${PORT}`);
});
