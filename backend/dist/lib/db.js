"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
let db = null;
const uri = process.env.DATABASE_URL || "mongodb://localhost:27017";
const connectDB = async () => {
    if (db)
        return db;
    try {
        const client = await mongodb_1.MongoClient.connect(uri);
        db = client.db("blog-app");
        console.log("Connected to MongoDB");
        return db;
    }
    catch (error) {
        console.error("Failed to connect to MongoDB", error);
        throw error;
    }
};
exports.default = connectDB;
