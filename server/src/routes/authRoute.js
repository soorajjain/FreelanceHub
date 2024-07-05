import express from "express";
import {
  userLogin,
  userRegister,
  editUserById,
  getAllUser,
  getUserById,
} from "../controller/authController.js";
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post("/login", userLogin);
router.post("/register", userRegister);
router.put("/edit/:id", authenticate, editUserById);
router.get("/", authenticate, getAllUser);
router.get("/:id", authenticate, getUserById);

export default router;
