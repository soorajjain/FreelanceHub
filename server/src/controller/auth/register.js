import express, { Router } from "express";
import userModel from "../../model/userModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import validator from "validator";
import bcrypt, { hash } from "bcrypt";
import HASH_ROUND from "../../config/constants.js";
import constants from "../../config/constants.js";

router.post("/", async (req, res) => {
  try {
    let response;

    const { user_name, role, email, password, image } = req.body;

    console.log(user_name);

    if (!user_name || user_name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "user name" + response.msg,
      });
    }
    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "Email" + response.msg,
      });
    }

    // if (!role || role == "") {
    //   response = RESPONSE.MANDATORY_PARAMS;
    //   return res.json({
    //     code: response.code,
    //     msg: "role" + response.msg,
    //   });
    // }
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

    const isExistingEmail = await userModel.findOne({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (isExistingEmail) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "Email" + response.msg,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, constants.HASH_ROUND);
    // console.log(encryptedPassword);

    await userModel.create({
      user_name: user_name,
      role: role,
      email: email,
      password: encryptedPassword,
      image: image,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
