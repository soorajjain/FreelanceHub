import { Schema } from "mongoose";
import mongoose from "mongoose";

const jobTakerModel = {
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
const initJobTakerModel = async () => {
  try {
    if (user) return user;
    user = mongoose.model("job_Takers", jobTakerModel);
    return user;
  } catch (error) {
    console.log("Error found in Student model", error);
  }
};

export default initJobTakerModel;
