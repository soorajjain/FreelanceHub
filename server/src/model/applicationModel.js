import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job_postings: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "job_postings", // Refers to the "job_postings" model for job postings
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_models", // Refers to the "user_models" model for freelancers/users
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

let Application;

try {
  Application = mongoose.model("applications", applicationSchema);
} catch (error) {
  console.log("Error found in application model creation:", error);
}

export default Application;
