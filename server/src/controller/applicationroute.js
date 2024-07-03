import express from "express";
import Application from "../model/applicationModel.js";

const router = express.Router();

// Apply for a job
router.post("/apply", async (req, res) => {
  try {
    const newApplication = new Application(req.body);
    const { freelancer } = req.body;
    console.log(freelancer);
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get applications by job posting
router.get("/job/:jobId", async (req, res) => {
  try {
    const applications = await Application.find({
      job_postings: req.params.jobId,
    })
      .populate("job_postings") // Populate with the "job_postings" model (job postings)
      .populate("freelancer"); // Populate with the "user_model"
    res.status(200).json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get applications by freelancer
router.get("/freelancer/:freelancerId", async (req, res) => {
  try {
    const applications = await Application.find({
      freelancer: req.params.freelancerId,
    })
      .populate("job_postings") // Populate with the "job_postings" model (job postings)
      .populate("freelancer"); // Populate with the "user_model" model (freelancers/users)
    res.status(200).json(applications);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
