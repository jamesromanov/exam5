import express from "express";
import * as commentsController from "../controllers/comments.controller";
import protector from "../middlewares/protector";
import { checkOwner } from "../middlewares/checkOwner";

const commentsRouter = express.Router();
/**
 * @swagger
 *  /api/comments/create:
 *   post:
 *     summary: Create a comment
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the comment
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
/**
 * @swagger
 *  /api/comments/update/{commentId}:
 *   put:
 *     summary:
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the user
 *     parameters:
 *       - in: path
 *         name: commentId
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Comments'
 *     responses:
 *           200:
 *            description: Successfully updated!
 *           401:
 *            description: Invalid token or expired token!
 *           409:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
commentsRouter
  .route("/update/:commentId")
  .put(protector, commentsController.updateCommentByid);
/**
 * @swagger
 *  /api/comments/delete/{commentId}:
 *   delete:
 *     summary:
 *     tags: [Comments]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the Comment
 *     parameters:
 *       - in: path
 *         name: commentId
 *     responses:
 *           204:
 *            description: Successfully deleted!
 *           401:
 *            description: Invalid token or expired token!
 *           409:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
commentsRouter
  .route("/delete/:commentId")
  .delete(protector, commentsController.deleteByid);

export default commentsRouter;
