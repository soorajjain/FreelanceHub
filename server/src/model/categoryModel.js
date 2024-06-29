import { Schema } from "mongoose";
import mongoose from "mongoose";

let categorySchema = new mongoose.Schema(
  {
    category_name: { type: String, required: true },
  },
  { timestamps: true }
);

let initCategoryModel = null;
try {
  initCategoryModel = mongoose.model("Category", categorySchema);
} catch (error) {
  console.log("Error found in category model creation:", error);
}

export default initCategoryModel;
