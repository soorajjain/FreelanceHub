import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = "mongodb://127.0.0.1:27017/freelance_app";
    await mongoose.connect(url);
    console.log("DATABASE connection succesfull");
  } catch (error) {
    console.log("DATABASE connection failed ", error);
  }
};

export default connectDB;
