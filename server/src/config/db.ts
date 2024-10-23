import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("failed to connect");
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
