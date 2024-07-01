import express, { response } from "express";
import { Router } from "express";
import mongoose from "mongoose";

const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import jobPostingsModel from "../../model/jobPostingModel.js";
import categoryModel from "../../model/categoryModel.js";
import skillsModel from "../../model/skillsModel.js";
import authenticate from "../../middleware/authenticate.js";
import checkRole from "../../middleware/checkRole.js";

// Create a job posting
router.post("/", authenticate, checkRole, async (req, res) => {
  try {
    let response;

    const {
      title,
      description,
      requirements, // Array of Skill IDs
      category, // Category ID
      budget,
      deadline,
      client,
    } = req.body;

    // console.log(
    //   title,
    //   description,
    //   requirements,
    //   category,
    //   budget,
    //   deadline,
    //   client
    // );

    if (!category || !mongoose.Types.ObjectId.isValid(category)) {
      response = RESPONSE.NOT_FOUND;
      return res.json({
        code: response.code,
        msg: "Invalid Category ID",
      });
    }

    // Fetching skills and category data from database
    const skills = await skillsModel.find({ _id: { $in: requirements } });
    const selectedCategory = await categoryModel.findById(category);

    if (!selectedCategory) {
      response = RESPONSE.NOT_FOUND;
      return res.json({
        code: response.code,
        msg: "Category" + response.msg,
      });
    }

    if (!title || title == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "Title" + response.msg,
      });
    }
    if (!description || description == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "description" + response.msg,
      });
    }

    if (!deadline || deadline == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "deadline" + response.msg,
      });
    }

    if (!budget || budget == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "budget" + response.msg,
      });
    }
    const client_posted = req.user.id;
    console.log(client_posted);

    const isSameData = await jobPostingsModel.findOne({
      title: title,
    });

    if (isSameData) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        msg: "Job" + response.msg,
      });
    }

    await jobPostingsModel.create({
      title,
      description,
      requirements: skills.map((skill) => skill._id),
      category: selectedCategory._id,
      budget,
      deadline,
      client: client_posted,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

router.get("/", async (req, res) => {
  let response;
  try {
    const jobs = await jobPostingsModel.find();
    return res.json(jobs);
  } catch (error) {
    response = RESPONSE.ERR_GET;
    return res.json({
      code: response.code,
      msg: "job post" + response.msg,
    });
  }
});

export default router;
