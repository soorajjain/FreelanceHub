import { Router } from "express";
import jobGiverRegister from "./jobGiver/jobGiverRegister.js";
import jobGiverLogin from "./jobGiver/jobGiverLogin.js";
import jobTakerRegister from "./jobTaker/jobTakerRegister.js";
import jobTakerLogin from "./jobTaker/jobTakerLogin.js";

const router = Router();

router.use("/jobGiverRegister", jobGiverRegister);
router.use("/jobGiverLogin", jobGiverLogin);
router.use("/jobTakerRegister", jobTakerRegister);
router.use("/jobTakerLogin", jobTakerLogin);

export default router;
