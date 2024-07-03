import express from "express";
import {
  createProject,
  updateProjectStatus,
  updateProjectMilestones,
  getProjectById,
} from "../controller/projectController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.get("/:id", authenticate, getProjectById);

router.post("/create", createProject);

router.put("/:id/update_status", authenticate, updateProjectStatus);

router.put("/:id/update_milestones", authenticate, updateProjectMilestones);

export default router;
