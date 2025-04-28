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
 *     summary: Returns a blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This will return blogs of a user
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

/**
 * @swagger
 *  /api/blogs/get-my-joined-blogs:
 *   get:
 *     summary: Returns a joined blogs only
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This method returns joined blogs only for the user
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
  .route("/get-my-joined-blogs")
  .get(protector, checkOwner, blogController.getMyJoinedBlogs);
/**
 * @swagger
 *  /api/blogs/get-blog-info/{blogId}:
 *   get:
 *     summary: Returns a blogs info by id
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This method only returns blog by their id
 *     parameters:
 *        - in: path
 *          name: blogId
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
  .route("/get-blog-info/:blogId")
  .get(protector, checkOwner, blogController.getBlogInfo);
/**
 * @swagger
 *  /api/blogs/update/{blogId}:
 *   put:
 *     summary: Updates blog by id
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     description: This method is to update the blogs by their id
 *     parameters:
 *        - in: path
 *          name: blogId
 *     requestBody:
 *        required: true
 *        content:
 *          applicaion/json:
 *            schema:
 *              $ref: '#/components/schemas/Blogs'
 *     responses:
 *           200:
 *            description: Successfully updated!
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
  .route("/update/:blogId")
  .put(protector, checkOwner, blogController.updateBlogById);

export default blogRouter;
