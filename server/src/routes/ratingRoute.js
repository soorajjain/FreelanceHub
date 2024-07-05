import express from "express";
import { reviewRatingPost } from "../controller/reviewRatingController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/:id", authenticate, reviewRatingPost);

export default router;
