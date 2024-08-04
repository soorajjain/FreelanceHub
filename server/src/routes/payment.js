import express from "express";
import { generateToken, processPayment } from "../controller/paymentController.js";

const router = express.Router();

router.get("/client_token", generateToken);
router.post("/checkout", processPayment);

export default router;
