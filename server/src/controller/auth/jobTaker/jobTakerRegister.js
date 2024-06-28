import express, { response } from "express";
const router = express.Router();

import initJobTakerModel from "../../../model/jobTaker.js";
import RESPONSE from "../../../config/global.js";
import validator from "validator";
import constants from "../../../config/constants.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    const jobTakerModel = await initJobTakerModel();
    const { name, email, phone, password } = req.body;
    // console.log(name, email, phone, password);
    let response;

    if (!name || name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "user name " + response.msg,
      });
    }
    if (!email || email == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "email " + response.msg,
      });
    }
    if (!phone || phone == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "phone " + response.msg,
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

    const isValidPhone =
      validator.isMobilePhone(phone) && phone.toString().length == 10;
    if (isValidPhone == false) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "phone " + response.msg,
      });
    }

    const isExistingEmail = await jobTakerModel.find({
      is_active: constants.STATE.ACTIVE,
      email: email,
    });

    if (isExistingEmail.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "Email ID " + response.msg,
      });
    }

    const isExistingPhone = await jobTakerModel.find({
      is_active: constants.STATE.ACTIVE,
      phone: phone,
    });

    if (isExistingPhone.length > 0) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "phone number " + response.msg,
      });
    }

    const encryptedPassword = await bcrypt.hash(password, constants.HASH_ROUND);

    await jobTakerModel.create({
      name: name,
      email: email,
      phone: phone,
      password: encryptedPassword,
    });

    // await userModel.create({
    //   user_name: "user_name",
    //   email: "email",
    //   phone: "phone",
    //   role:1,
    //   password: encryptedPassword,
    //   image: image,
    // });

    res.json((response = RESPONSE.SUCCESS));
  } catch (error) {
    console.log(error);
    response = RESPONSE.UNKNOWN_ERROR;
    return res.json({
      code: response.code,
      msg: "Register page " + response.msg,
    });
  }
});

export default router;
