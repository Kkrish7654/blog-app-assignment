import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";

mongoose.connect("mongodb://localhost:27017/blog-app");
// Routes Import
import userRoutes from "./routes/user.route";
import blogRoutes from "./routes/blog.route";

import cors from "cors";
dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

export default app;
