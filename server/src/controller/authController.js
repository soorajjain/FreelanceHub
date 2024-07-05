// routes/userRoutes.js
import express from "express";
import userModel from "../model/userModel.js";
import { RESPONSE } from "../config/global.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import constants from "../config/constants.js";
import uploads from "../middleware/uploads.js"; // Import uploads middleware
import multer from "multer";

const router = express.Router();

// user login function
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email === "") {
      return res.json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Email" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    if (!password || password === "") {
      return res.json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Password" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid email format",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.user_name,
        email: user.email,
        role: user.role,
      },
      process.env.TOKENKEY
    );

    return res.json({
      code: RESPONSE.SUCCESS.code,
      msg: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.json({ msg: "Something went wrong while login." });
  }
};

// user registration function
export const userRegister = async (req, res) => {
  try {
    const { user_name, role, email, password } = req.body;

    if (!user_name || user_name === "") {
      return res.json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "User name" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }
    if (!email || email === "") {
      return res.json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Email" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }
    if (!password || password === "") {
      return res.json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Password" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid email format",
      });
    }

    const isExistingEmail = await userModel.findOne({ email: email });
    if (isExistingEmail) {
      return res.json({
        code: RESPONSE.ALREADY_EXISTS.code,
        msg: "Email already exists",
      });
    }

    const encryptedPassword = await bcrypt.hash(password, constants.HASH_ROUND);

    const newUser = new userModel({
      user_name: user_name,
      role: role,
      email: email,
      password: encryptedPassword,
    });

    await newUser.save();

    return res.status(400).json({ msg: "Registerd Succesfully!!" });
  } catch (error) {
    console.error("User registration error:", error);
    return res.json({ msg: "Something went wrong while registration." });
  }
};

// edit user by id
export const editUserById = async (req, res) => {
  try {
    uploads(req, res, async (err) => {
      if (err instanceof multer.MulterError) {
        console.log(err);

        return res
          .status(400)
          .json({ msg: err + " error occurred during file upload" });
      }
      if (err) {
        return res
          .status(500)
          .json({ msg: "Unknown error occurred during file upload" });
      }

      let profile_image = [];
      if (req.files["profile_image"]) {
        profile_image = req.files["profile_image"].map((file) => file.filename);
      }

      let resume = null;
      if (req.files["resume"] && req.files["resume"].length > 0) {
        resume = req.files["resume"][0].filename;
      }

      const { user_name, email, password, skills, about } = req.body;

      if (!profile_image.length) {
        return res
          .status(400)
          .json({ msg: "Profile image is a mandatory parameter" });
      }
      if (!resume) {
        return res.status(400).json({ msg: "Resume is a mandatory parameter" });
      }
      if (!about) {
        return res.status(400).json({ msg: "About is a mandatory parameter" });
      }

      const updateObj = {
        user_name,
        email,
        password,
        skills,
        profile_image: profile_image,
        resume: resume,
        about,
        // Add other fields as needed
      };

      const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        updateObj,
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ msg: "User not found" });
      }

      return res.status(200).json({
        msg: `${user_name}'s profile updated successfully`,
        data: updatedUser,
      });
    });
  } catch (error) {
    console.error("Edit user error:", error);
    res.status(500).json({ msg: "Error updating user", error });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    let users = await userModel.find();

    if (users && users.length > 0) {
      users = users.map((user) => ({
        _id: user._id,
        user_name: user.user_name,
        email: user.email,
        role: user.role,
        skills: user.skills,
        resume: user.resume
          ? user.resume.map((file) => "/uploads/" + file)
          : [],
        profile_image: user.profile_image
          ? user.profile_image.map((file) => "/uploads/" + file)
          : [],
        // Add other fields as needed
      }));

      return res.json(users);
    } else {
      return res.status(404).json({ msg: "No users found" });
    }
  } catch (error) {
    console.error("Get all users error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong while fetching users." });
  }
};

// Get user by id
export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const formattedUser = {
      _id: user._id,
      user_name: user.user_name,
      email: user.email,
      role: user.role,
      skills: user.skills,
      resume: user.resume ? user.resume.map((file) => "/uploads/" + file) : [],
      profile_image: user.profile_image
        ? user.profile_image.map((file) => "/uploads/" + file)
        : [],
      // Add other fields as needed
    };

    return res.status(200).json(formattedUser);
  } catch (error) {
    console.error("Get user by id error:", error);
    return res.json({ msg: "Something went wrong while registration." });
  }
};

export default router;
