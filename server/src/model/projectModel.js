import { Schema } from "mongoose";
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    jobPosting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_postings",
      required: true,
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_models",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_models",
      required: true,
    },
    milestones: [
      {
        description: String,
        dueDate: Date,
        isCompleted: Boolean,
      },
    ],
    status: {
      type: String,
      default: "not started",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  { timestamps: true }
);

let initProjectModel = null;
try {
  initProjectModel = mongoose.model("Project", projectSchema);
} catch (error) {
  console.log("Error found in project model creation:", error);
}

export default initProjectModel;
