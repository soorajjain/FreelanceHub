import { Schema } from "mongoose";
import mongoose from "mongoose";

// Define the schema
const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    company_name: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["freelancer", "client"],
      required: true,
    },
    skills: [String],
    about: String,
    experience: String,

    resume: {
      type: [String],
    },
    profile_image: {
      type: [String],
      // data: buffer,
      required: true,
    },
    jobPostings: [
      {
        type: Schema.Types.ObjectId,
        ref: "job_postings",
      },
    ],
    is_active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Create the model
let initUserModel = null;
try {
  initUserModel = mongoose.model("user_models", userSchema);
} catch (error) {
  console.log("Error found in user model creation:", error);
}

export default initUserModel;
