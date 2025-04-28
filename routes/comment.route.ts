import express from "express";
import * as commentsController from "../controllers/comments.controller";
import protector from "../middlewares/protector";
import { checkOwner } from "../middlewares/checkOwner";

const commentsRouter = express.Router();
/**
 * @swagger
 *  /api/comments/create:
 *   post:
 *     summary: Create a post
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the user
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Comments'
 *     responses:
 *           201:
 *            description: Successfully added!
 *           401:
 *            description: Invalid token or expired token!
 *           409:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
commentsRouter
  .route("/create")
  .post(protector, commentsController.createComment);

export default commentsRouter;
