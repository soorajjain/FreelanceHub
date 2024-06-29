import express, { Router } from "express";
import userModel from "../../model/userModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    let response;

    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "mail" + response.msg,
      });
    }

    if (!password || password == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "password" + response.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (isValidEmail == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "email " + response.msg,
      });
    }

    const user = await userModel.findOne({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        {
          id: user._id,
          name: user.user_name,
          email: user.email,
          role: user.role,
        },
        process.env.TOKENKEY
      );

      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: response.msg,
        token: token,
      });
    } else {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "login credentials" + response.msg,
      });
    }
    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
