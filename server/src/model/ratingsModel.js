import { Schema } from "mongoose";
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    freelancer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projectModel",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: String,
  },
  { timestamps: true }
);

let iniRatingsModel = null;
try {
  initUserModel = mongoose.model("Ratings", ratingSchema);
} catch (error) {
  console.log("Error found in Rating Model creation:", error);
}

export default iniRatingsModel;
