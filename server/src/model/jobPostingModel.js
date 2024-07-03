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
      ref: "user_models",
    },
    banner_image: {
      type: [String],
      required: "true",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "applications",
      },
    ],
  },
  { timestamps: true }
);

let jobPostingsModel = null;
try {
  jobPostingsModel = mongoose.model("job_postings", jobPostingSchema);
} catch (error) {
  console.log("Error found in job post creation:", error);
}

export default jobPostingsModel;
