import express from "express";
const router = express.Router();

import jobPosting from "./jobPosting.js";
import updateclient from "./updateClient.js";
import deleteclient from "./deleteClient.js";

router.use("/job_posting", jobPosting);
router.use("/update_client", updateclient);
router.use("/delete_client", deleteclient);

export default router;