import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // Load env variables

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

export default connectMongoDB;
