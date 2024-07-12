import express from "express";
const router = express.Router();

import addSkill from "./addSkills.js";
import addCategory from "./addCategory.js";

router.use("/category", addCategory);
router.use("/skill", addSkill);

export default router;
