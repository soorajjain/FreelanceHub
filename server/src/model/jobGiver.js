import { Schema } from "mongoose";
import mongoose from "mongoose";

const jobGiverModel = {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
    // data: Buffer,
    required: true,
  },
  is_active: {
    type: String,
    default: 1,
  },
};

let user = null;
const initJobGiverModel = async () => {
  try {
    if (user) return user;
    user = mongoose.model("job_giver", jobGiverModel);
    return user;
  } catch (error) {
    console.log("Error found in job giver model", error);
  }
};

export default initJobGiverModel;
