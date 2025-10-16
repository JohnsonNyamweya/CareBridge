import express from "express";
import { initiateStkPush, mpesaCallback } from "../controllers/paymentController.js";
import authUser from "../middlewares/authUser.js";
import generateToken from "../middlewares/generateToken.js";

const paymentRouter = express.Router();

paymentRouter.post("/stkpush", authUser, generateToken, initiateStkPush);        // Frontend triggers this
paymentRouter.post("/callback", mpesaCallback); // Safaricom calls this

export default paymentRouter;
