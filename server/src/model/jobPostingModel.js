import mongoose from "mongoose";
import { Schema } from "mongoose";

const jobPostingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "skillsModel",
        
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "categoryModel",
    },
    budget: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
      },
    ],
  },
  { timestamps: true }
);

let jobPostingsModel = null;
try {
  jobPostingsModel = mongoose.model("Job_Postings", jobPostingSchema);
} catch (error) {
  console.log("Error found in job post creation:", error);
}

export default jobPostingsModel;
