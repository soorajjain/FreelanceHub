//in db we never delete any data we just disable it
//so we use put to disable by constant state to inactive

import express from "express";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";
import constants from "../../config/constants.js";
import authenticate from "../../middleware/authenticate.js";
import userModel from "../../model/userModel.js";
import mongoose from "mongoose";

//this ? allows that id is optional
router.put("/:id", authenticate, async (req, res) => {
  try {
    const client_id = req.params.id;

    let response;
    //take the id thats there in put method in the top -/:id?

    const isValidId = await userModel.findOne({
      _id: client_id,
      is_active: constants.STATE.ACTIVE,
    });
    if (!isValidId) {
      response = RESPONSE.INVALID_DATA;
      return res.json({
        code: response.code,
        msg: "ID" + response.msg,
      });
    }
    if (!mongoose.Types.ObjectId.isValid(client_id)) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid ID format",
      });
    }

    await userModel.findOneAndUpdate(
      {
        _id: client_id,
        is_active: constants.STATE.ACTIVE,
      },
      { is_active: constants.STATE.INACTIVE }
    );

    // this is how to delete but just change the req to del -> router.del

    // await studentModel.deleteOne(
    //     {
    //       _id: student_id,
    //       is_active: constants.STATE.ACTIVE,
    //     },
    //   );

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log("edit client delete page : ", error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

export default router;
