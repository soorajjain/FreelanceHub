import express, { response } from "express";
const router = express.Router();

import initJobTakerModel from "../../../model/jobTaker.js";

import RESPONSE from "../../../config/global.js";
import validator from "validator";
import constants from "../../../config/constants.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

router.post("/", async (req, res) => {
  try {
    const jobTakerModel = await initJobTakerModel();
    const { email, password } = req.body;
    let response;

    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "email " + response.msg,
      });
    }

    if (!password || password == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "password " + response.msg,
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

    const data = await jobTakerModel.findOne({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (data && (await bcrypt.compare(password, data.password))) {
      const token = jwt.sign(
        {
          id: data._id,
          name: data.email,
        },
        process.env.TOKENKEY
      );

      response = RESPONSE.SUCCESS;
      return res.json({
        code: response.code,
        msg: response.msg,
        data: token,
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
    response = RESPONSE.UNKNOWN_ERROR;
    return res.json({
      code: response.code,
      msg: "Login page " + response.msg,
    });
  }
});

export default router;
