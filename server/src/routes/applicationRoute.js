import express from "express";
import {
  applyApplication,
  getApplicationByJobId,
  getApplicationByFreelancerId,
  clientAccept,
  clientReject,
} from "../controller/applicationroute.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/apply/:id", authenticate, applyApplication);
router.get("/job/:jobId", getApplicationByJobId);
router.get("/freelancer/:freelancerId", getApplicationByFreelancerId);
router.post("/:id/accept", authenticate, clientAccept);
router.put("/:id/reject", authenticate, clientReject);

export default router;
