import express, { Router } from "express";
import skillsModel from "../../model/skillsModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";

router.post("/", async (req, res) => {
  try {
    let response;

    const { skill_name } = req.body;

    const isSkillExist = await skillsModel.findOne({
      skill_name: skill_name,
    });

    if (isSkillExist) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "Skill" + response.msg,
      });
    }

    if (!skill_name || skill_name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "Skill name" + response.msg,
      });
    }

    await skillsModel.create({
      skill_name: skill_name,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

router.get("/", async (req, res) => {
  try {
    const skills = await skillsModel.find();
    return res.json(skills);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
