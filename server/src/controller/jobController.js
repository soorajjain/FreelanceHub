import express from "express";
import mongoose from "mongoose";

const router = express.Router();
import { RESPONSE } from "../config/global.js";
import jobPostingsModel from "../model/jobPostingModel.js";
import categoryModel from "../model/categoryModel.js";
import skillsModel from "../model/skillsModel.js";

// Create a job posting
export const postJob = async (req, res) => {
  try {
    let response;

    const {
      title,
      description,
      requirements,
      category,
      budget,
      deadline,
      client,
    } = req.body;

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
        msg: "Deadline" + response.msg,
      });
    }

    if (!budget || budget == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "Budget" + response.msg,
      });
    }
    const client_posted = req.user.id;

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
};

// Get all jobs
export const getAllJob = async (req, res) => {
  let response;
  try {
    const jobs = await jobPostingsModel.find();
    return res.json(jobs);
  } catch (error) {
    return res.json({ msg: "Something went wrong while fetching jobs." });
  }
};

// Get job by id
export const getJobById = async (req, res) => {
  try {
    const id = req.params.id;
    const job = await jobPostingsModel.findById(id);
    res.json(job);
  } catch (err) {
    console.log(err);
    res.res.json({ msg: "Something went wrong while fetching job." });
  }
};

// Edit job by id
export const editJobById = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      category,
      budget,
      deadline,
      client,
    } = req.body;

    if (!category || !mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({ msg: "Invalid Category ID" });
    }

    const skills = await skillsModel.find({ _id: { $in: requirements } });
    const selectedCategory = await categoryModel.findById(category);

    if (!selectedCategory) {
      return res.status(404).json({ msg: "Category not found" });
    }

    const updateObj = {
      title,
      description,
      requirements: skills.map((skill) => skill._id),
      category: selectedCategory._id,
      budget,
      deadline,
      client,
    };

    const updatedJob = await jobPostingsModel.findByIdAndUpdate(
      req.params.id,
      updateObj,
      { new: true }
    );

    if (!updatedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong while updating jobs." });
  }
};

// Delete job by id
export const deleteJobById = async (req, res) => {
  try {
    const deletedJob = await jobPostingsModel.findByIdAndDelete(req.params.id);

    if (!deletedJob) {
      return res.status(404).json({ msg: "Job not found" });
    }

    res.json({ msg: "Job deleted successfully" });
  } catch (error) {
    console.log(error);
    res.json({ msg: "Something went wrong while updating jobs." });
  }
};

export default router;
