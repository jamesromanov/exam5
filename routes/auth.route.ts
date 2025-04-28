import express from "express";
import * as authController from "../controllers/auth.controller";
import protector from "../middlewares/protector";

const authRouter = express.Router();
/**
 * @swagger
 * /api/auth/register:
 *  post:
 *   summary: User register!
 *   tags: [Users]
 *   description: This is user register!
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Users'
 *   responses:
 *        201:
 *         description: Successfully registered!
 *        400:
 *         description: Invalid data entered!
 *        409:
 *         description: Missing information!
 *        500:
 *         description: Internal server error!
 */
authRouter.route("/register").post(authController.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *   summary: User log in!
 *   tags: [Users]
 *   security:
 *     - bearerAuth: []
 *   description: This is user log in!
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/UserLogin'
 *   responses:
 *          200:
 *           description: Successfully loged in!
 *          404:
 *           description: User not found!
 *          409:
 *           description: Invalid data entered!
 *          500:
 *           description: Internal server error!
 *
 */

authRouter.route("/login").post(authController.login);

export default authRouter;
