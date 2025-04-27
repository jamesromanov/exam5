import express from "express";
import * as authController from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.route("/register").post(authController.register);

export default authRouter;
