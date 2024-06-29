import { Schema } from "mongoose";
import mongoose from "mongoose";

// Define the schema
const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    required: true,
  },
  role: {
    type: String,
    enum: ["freelancer", "client"],
    required: true,
  },
  skills: [String],
  portfolio: [String],
  company: [String],
  jobPostings: [
    {
      type: Schema.Types.ObjectId,
      ref: "JobPosting",
    },
  ],
  is_active: {
    type: String,
    default: "1", // Changed to string to match your type
  },
});

// Create the model
let initUserModel = null;
try {
  initUserModel = mongoose.model("User_Model", userSchema);
} catch (error) {
  console.log("Error found in user model creation:", error);
}

export default initUserModel;
