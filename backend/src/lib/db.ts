import { MongoClient } from "mongodb";

let db: any = null;

const uri = process.env.DATABASE_URL || "mongodb://localhost:27017";

const connectDB = async () => {
  if (db) return db;

  try {
    const client = await MongoClient.connect(uri);
    db = client.db("blog-app");
    console.log("Connected to MongoDB");
    return db;
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }
};

export default connectDB;
