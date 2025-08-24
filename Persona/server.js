import express from "express"
import dotenv  from 'dotenv';
import bodyParser from "body-parser"
import cors from "cors"
import mongoose from "mongoose";
import chatRoute from "./Chat.Routes.js"
dotenv.config();
const app = express();
app.use(cors({
  origin: [
    'http://localhost:3000'
  ],
  credentials: true
}));

app.use(bodyParser.json());
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

connectDB();
app.use('/api',chatRoute);
app.listen(5000, () => {
  console.log("🚀 Server running at http://localhost:5000");
});