import express, { Router, response } from "express";
import categoryModel from "../../model/categoryModel.js";
const router = express.Router();
import { RESPONSE } from "../../config/global.js";

router.post("/post", async (req, res) => {
  try {
    let response;

    const { category_name } = req.body;

    const isCategoryExist = await categoryModel.findOne({
      category_name: category_name,
    });

    if (isCategoryExist) {
      response = RESPONSE.ALREADY_EXISTS;
      return res.json({
        code: response.code,
        message: "Category" + response.msg,
      });
    }

    if (!category_name || category_name == "") {
      response = RESPONSE.MANDATORY_PARAMS;
      return res.json({
        code: response.code,
        msg: "category name" + response.msg,
      });
    }

    await categoryModel.create({
      category_name: category_name,
    });

    return res.json(RESPONSE.SUCCESS);
  } catch (error) {
    console.log(error);
    return res.json(RESPONSE.UNKNOWN_ERROR);
  }
});

router.get("/", async (req, res) => {
  try {
    let response;
    const categories = await categoryModel.find();
    return res.json(categories);
  } catch (error) {
    response = RESPONSE.ERR_GET;
    console.log(error);
    return res.json({
      code: response.code,
      msg: response.msg,
    });
  }
});

export default router;
