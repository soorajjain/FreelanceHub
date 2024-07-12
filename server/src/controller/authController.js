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
import mongoose from "mongoose";

const router = express.Router();

// user login function
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || email === "") {
      return res.status(400).json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Email" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    if (!password || password === "") {
      return res.status(400).json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Password" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid email format",
      });
    }

    const user = await userModel.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
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

    return res.status(200).json({
      code: RESPONSE.SUCCESS.code,
      msg: "Login successful",
      token: token,
    });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ msg: "Something went wrong while login." });
  }
};

// user registration function
export const userRegister = async (req, res) => {
  try {
    const { user_name, role, email, password } = req.body;

    if (!user_name || user_name === "") {
      return res.status(400).json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Name" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }
    if (!email || email === "") {
      return res.status(400).json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Email" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }
    if (!password || password === "") {
      return res.status(400).json({
        code: RESPONSE.MANDATORY_PARAMS.code,
        msg: "Password" + RESPONSE.MANDATORY_PARAMS.msg,
      });
    }

    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      return res.status(400).json({
        code: RESPONSE.INVALID_DATA.code,
        msg: "Invalid email format",
      });
    }

    const isExistingEmail = await userModel.findOne({ email: email });
    if (isExistingEmail) {
      return res.status(400).json({
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

    return res.status(201).json({ msg: "Registered Successfully!" });
  } catch (error) {
    console.error("User registration error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong while registration." });
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

      const {
        user_name,
        email,
        password,
        skills,
        about,
        experience,
        company_name,
      } = req.body;

      let profile_image = [];
      if (req.files["profile_image"]) {
        profile_image = req.files["profile_image"].map((file) => file.filename);
      }

      let resume = [];
      if (req.files["resume"]) {
        resume = req.files["resume"].map((file) => file.filename);
      }

      if (!profile_image || profile_image.length === 0) {
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
      if (!skills) {
        return res.status(400).json({ msg: "Skills is a mandatory parameter" });
      }
      if (!experience) {
        return res
          .status(400)
          .json({ msg: "experience is a mandatory parameter" });
      }
      if (!company_name) {
        return res
          .status(400)
          .json({ msg: "company_name is a mandatory parameter" });
      }

      const updateObj = {
        user_name,
        email,
        company_name,
        experience,
        password,
        skills,
        profile_image: profile_image.map((file) => "/uploads/" + file),
        resume: resume.map((file) => "/uploads/" + file),
        about,
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
        about: user.about,
        company_name: user.company_name,
        experience: user.experience,
        resume: user.resume,

        profile_image: user.profile_image,
      }));

      return res.status(200).json(users);
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
    const userId = req.params.id; // Assuming your route parameter is named 'id'

    if (!userId) {
      return res.status(400).json({ msg: "User ID not provided" });
    }

    // Check if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ msg: "Invalid user ID" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // const formattedUser = {
    //   _id: user._id,
    //   user_name: user.user_name,
    //   email: user.email,
    //   role: user.role,
    //   skills: user.skills,
    //   about: user.about,
    //   resume: user.resume ? user.resume.map(file => `/uploads/${file}`) : [],
    //   profile_image: user.profile_image ? user.profile_image.map(file => `/uploads/${file}`) : [],
    // };

    return res.status(200).json(user);
  } catch (error) {
    console.error("Get user by id error:", error);
    return res
      .status(500)
      .json({ msg: "Something went wrong while fetching user." });
  }
};

export default router;
