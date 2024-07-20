import express from "express";
import {
  reviewRatingPost,
  getReviewAndRatingFreelancer,
} from "../controller/reviewRatingController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/:id", authenticate, reviewRatingPost);
router.get("/freelancer/:id", authenticate, getReviewAndRatingFreelancer);
// router.get("/freelancer", getReviewAndRatingFreelancer);

export default router;
