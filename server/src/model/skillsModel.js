import { Schema } from "mongoose";
import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    skill_name: { type: String, required: true },
  },
  { timestamps: true }
);

let initSkillsModel = null;
try {
  initSkillsModel = mongoose.model("Skill", skillSchema);
} catch (error) {
  console.log("Error found in Skills model creation:", error);
}

export default initSkillsModel;
