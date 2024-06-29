import express from "express";
const router = express.Router();

import addSkill from "./addSkills.js";
import addCategory from "./addCategory.js";

router.use("/addcategory", addCategory);
router.use("/addskill", addSkill);

export default router;
