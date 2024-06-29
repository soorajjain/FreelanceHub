import { Schema } from "mongoose";
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    jobPosting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "JobPostingModel",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    coverLetter: String,
    status: {
      type: String,
      enum: ["applied", "interviewing", "offered", "hired", "rejected"],
      default: "applied",
    },
  },
  { timestamps: true }
);

let initApplicationModel = null;
try {
  initApplicationModel = mongoose.model("Applications", applicationSchema);
} catch (error) {
  console.log("Error found in user model creation:", error);
}

export default initApplicationModel;
