import express from "express";
const router = express.Router();

import updatefreelancers from "./updateFreelancers.js";
import deletefreelancers from "./deleteFreelancers.js";

router.use("/update_freelancers", updatefreelancers);
router.use("/delete_freelancers", deletefreelancers);

export default router;
