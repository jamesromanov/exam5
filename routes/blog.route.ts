import express from "express";
import * as blogController from "../controllers/blogs.controller";
import protector from "../middlewares/protector";
import { checkOwner } from "../middlewares/checkOwner";

const blogRouter = express.Router();
/**
 * @swagger
 *  /api/blogs/create:
 *   post:
 *     summary: Create a post
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the user
 *     requestBody:
 *       required: true
 *       content:
 *        application/json:
 *         schema:
 *           $ref: '#/components/schemas/Blogs'
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
blogRouter.route("/create").post(protector, blogController.createBlog);
/**
 * @swagger
 *  /api/blogs/get-my-blogs:
 *   get:
 *     summary: Returns a posts
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This is creating method of the user
 *     parameters:
 *       - in: query
 *         name: limit
 *       - in: query
 *         name: page
 *     responses:
 *           200:
 *            description: Successfully returned!
 *           401:
 *            description: Invalid token or expired token!
 *           404:
 *            description: No data found!
 *           400:
 *            description: Invalid data entered!
 *           500:
 *            description: Internal server error!
 */
blogRouter
  .route("/get-my-blogs")
  .get(protector, checkOwner, blogController.getMyBlogs);

export default blogRouter;
