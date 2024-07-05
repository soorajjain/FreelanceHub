import express from "express";
import ratingsModel from "../model/ratingsModel.js";
import projectModel from "../model/projectModel.js";

const router = express.Router();

// Submit Review and Rating
export const reviewRatingPost = async (req, res) => {
  const { rating, review } = req.body;

  try {
    const project = await projectModel.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }
    if (!rating) {
      return res.status(400).json({ msg: "Rating not found" });
    }
    if (!review) {
      return res.status(400).json({ msg: "Review not found" });
    }

    const existingReview = await ratingsModel.findOne({
      project: req.params.id,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ msg: "Review already exists for this project" });
    }

    const newRating = new ratingsModel({
      client: req.user.id,
      freelancer: project.freelancer,
      project: req.params.id,
      rating: rating,
      review: review,
    });

    const savedRating = await newRating.save();
    res.status(201).json(savedRating);
  } catch (err) {
    console.error(err.message);
    res
      .status(500)
      .json({ msg: "Something went wrong while uploading review jobs." });
  }
};

export default router;
