import express from "express";
import {
  getAllJob,
  getJobById,
  postJob,
  editJobById,
  deleteJobById,
} from "../controller/jobController.js";
import authenticate from "../middleware/authenticate.js";
import checkRole from "../middleware/checkRole.js";

const router = express.Router();

router.post("/postJob", authenticate, checkRole, postJob);
router.get("/", getAllJob);
router.get("/:id", authenticate, getJobById);
router.put("/edit/:id", authenticate, editJobById);
router.delete("/delete/:id", authenticate, deleteJobById);

export default router;
