import express from "express";
const router = express.Router();

import jobPosting from "./jobPosting.js";

router.use("/job_posting", jobPosting);

export default router;
