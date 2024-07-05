import express from "express";
import Application from "../model/applicationModel.js";
import projectModel from "../model/projectModel.js";

const router = express.Router();

// Apply for a job
export const applyApplication = async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const freelancer = req.user.id;
    const job_postings = req.params.id;

    const newApplication = new Application({
      freelancer: freelancer,
      job_postings: job_postings,
      coverLetter: coverLetter,
    });

    const savedApplication = await newApplication.save();

    res.status(201).json({
      msg: "Applied successfully",
      data: savedApplication,
    });
  } catch (error) {
    // Handle any errors
    res
      .status(400)
      .json({ msg: "Something went wrong while applying for job." });
  }
};

// Get applications by job posting
export const getApplicationByJobId = async (req, res) => {
  try {
    const applications = await Application.find({
      job_postings: req.params.jobId,
    })
      .populate("job_postings") // Populate with the "job_postings" model (job postings)
      .populate("freelancer"); // Populate with the "user_model"
    res.status(200).json({
      msg: "Something went wrong while applying for job.",
      data: applications,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Something went wrong while fetching aplications" });
  }a
};

// Get applications by freelancer
export const getApplicationByFreelancerId = async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.params.freelancerId,
    })
      .populate("job_postings") // Populate with the "job_postings" model (job postings)
      .populate("freelancer"); // Populate with the "user_model" model (freelancers/users)
    res.status(200).json({
      msg: "Something went wrong while applying for job.",
      data: applications,
    });
  } catch (error) {
    res
      .status(400)
      .json({ msg: "Something went wrong while fetching applications." });
  }
};

// params id will be application
export const clientAccept = async (req, res) => {
  try {
    console.log(req.user);
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    application.status = "hired";
    await application.save();

    // Create project
    const project = new projectModel({
      jobPosting: application.job_postings,
      client: req.user.id,
      freelancer: application.freelancer,
    });
    await project.save();

    res
      .status(200)
      .json({ msg: "Application accepted and project created", data: project });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong while accepting application." });
  }
};

// Reject application
export const clientReject = async (req, res) => {
  try {
    const { rejectionMessage } = req.body;
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ msg: "Application not found" });
    }
    if (!rejectionMessage) {
      return res.status(404).json({ msg: "Rejection Message is required !!" });
    }

    application.status = "rejected";
    application.rejectionMessage = rejectionMessage;
    await application.save();

    res.status(200).json({ msg: "Application rejected", data: application });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Something went wrong while accepting the application." });
  }
};

export default router;
