import express from "express";
import bcrypt from "bcrypt";

const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import userModel from "../../model/userModel.js";
import mongoose from "mongoose";

router.put("/:id", authenticate, async (req, res) => {
  try {
    const freelancer_id = req.params.id;

    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(freelancer_id)) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid ID format",
      });
    }

    const { user_name, email, password, skills, about, portfolio } = req.body;
    let updates = {};

    const isValidId = await userModel.findOne({
      _id: freelancer_id,
      is_active: constants.STATE.ACTIVE,
    });

    if (!isValidId) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid ID",
      });
    }
    // Validate the ID format
    if (!mongoose.Types.ObjectId.isValid(freelancer_id)) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid ID format",
      });
    }

    if (user_name && user_name.trim() !== "") {
      updates.user_name = user_name;
    }
    if (email && email.trim() !== "") {
      updates.email = email;
    }
    if (password && password.trim() !== "") {
      const encryptedPassword = await bcrypt.hash(
        password,
        constants.HASH_ROUND
      );
      updates.password = encryptedPassword;
    }
    if (skills && skills.trim() !== "") {
      updates.skills = skills;
    }
    if (about && about.trim() !== "") {
      updates.about = about;
    }

    if (portfolio && portfolio.trim() !== "") {
      portfolio.about = portfolio;
    }

    console.log("Updates: ", updates);

    await userModel.findOneAndUpdate({ _id: freelancer_id }, updates);

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.error("Edit freelancers page : ", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
