import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("💚 Database connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;
