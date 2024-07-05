import { Schema } from "mongoose";
import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
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
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

let initRatingsModel = null;
try {
  initRatingsModel = mongoose.model("Ratings", ratingSchema);
} catch (error) {
  console.log("Error found in Rating Model creation:", error);
}

export default initRatingsModel;
