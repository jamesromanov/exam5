import express from "express";
import * as postController from "../controllers/post.controller";
import protector from "../middlewares/protector";
import { checkOwner } from "../middlewares/checkOwner";

const postRouter = express.Router();
/**
 * @swagger
 *  /api/posts/create/{blogId}:
 *   post:
 *     summary: Create a post
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the user
 *     parameters:
 *        - in: path
 *          name: blogId
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Posts'
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
postRouter
  .route("/create/:blogId")
  .post(protector, checkOwner, postController.create);

/**
 * @swagger
 *  /api/posts/getAll/{blogId}:
 *   get:
 *     summary: Get posts of the blogs by blog id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     description: This method is to get the posts by blogId!
 *     parameters:
 *        - in: path
 *          name: blogId
 *     responses:
 *           200:
 *            description: Successfully returned!
 *           401:
 *            description: Invalid token or expired token!
 *           409:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
postRouter
  .route("/getAll/:blogId")
  .get(protector, checkOwner, postController.getAll);
/**
 * @swagger
 *  /api/posts/get-by-id/{postId}:
 *   get:
 *     summary: Get posts by id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     description: This method is to get the posts by id!
 *     parameters:
 *        - in: path
 *          name: blogId
 *     responses:
 *           200:
 *            description: Successfully returned!
 *           401:
 *            description: Invalid token or expired token!
 *           409:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
postRouter
  .route("/get-by-id/:postId")
  .get(protector, checkOwner, postController.getById);
/**
 * @swagger
 *  /api/posts/update/{postId}:
 *   put:
 *     summary: update posts by id
 *     tags: [Posts]
 *     security:
 *       - bearerAuth: []
 *     description: This method is to update posts by id!
 *     parameters:
 *        - in: path
 *          name: postId
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              $ref: '#/components/schemas/Posts'
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
postRouter
  .route("/update/:postId")
  .put(protector, checkOwner, postController.updatePost);
export default postRouter;
