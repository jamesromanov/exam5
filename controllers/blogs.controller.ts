import { NextFunction, Response, Request } from "express";
import { RequestCustom, UserPro } from "../types/User";
import errorHandler from "../utils/errorHandler";
import Joi, { ValidationResult } from "joi";
import { Blogs } from "../types/Blogs";
import { response } from "../utils/response";
import Blog from "../models/blog.model";
import Follower from "../models/follower.model";
import { ID } from "../types/id";
import { Op } from "sequelize";
import User from "../models/user.model";

const blogsValidator = Joi.object({
  title: Joi.string().min(3).required(),
  content: Joi.string().min(3).required(),
  user_id: Joi.number().min(1),
  image: Joi.string().min(2),
  isActive: Joi.boolean().default(true),
});
const createBlog = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: bodyErr, value: body }: ValidationResult<Blogs> =
      blogsValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    body.user_id = req.user?.id;
    let blog = await Blog.create(body);
    response(res, blog, 201);
  }
);

const getMyBlogs = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (isNaN(limit) || limit < 1) limit = 10;
    if (isNaN(page) || page < 1) page = 1;

    let offset = (page - 1) * limit;
    let { count: totalBlogsCount, rows: totalBlogs } =
      await Blog.findAndCountAll({
        where: {
          user_id: req.user?.id,
          isActive: true,
        },
        limit,
        offset,
      });
    let totalPages = Math.ceil(totalBlogsCount / limit);

    response(res, {
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      totalBlogsCount,
      totalBlogs,
    });
  }
);

const getMyJoinedBlogs = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (isNaN(limit) || limit < 1) limit = 10;
    if (isNaN(page) || page < 1) page = 1;

    let offset = (page - 1) * limit;
    let parentId = req.user?.id;
    let { count: totalJoinsCound, rows: totalFollowed } =
      await Follower.findAndCountAll({
        where: {
          follower_id: parentId,
          isActive: true,
        },
        attributes: [],
        include: [
          {
            model: Blog,
            attributes: ["title", "content", "image"],
          },
        ],
        limit,
        offset,
      });

    if (!totalFollowed.length)
      return response(res, "No joined blogs found!", 404);
    let totalPages = Math.ceil(totalJoinsCound / limit);
    response(res, {
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      totalJoinsCound,
      totalFollowed,
    });
  }
);
const idValidator = Joi.object({
  blogId: Joi.number().min(1).required(),
});
const getBlogInfo = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    console.log(req.params);
    let { error: idErr, value: polishedId }: ValidationResult<ID> =
      idValidator.validate(req.params);
    if (idErr) return response(res, idErr.details[0].message, 409);
    let blog = await Blog.findOne({
      where: {
        id: polishedId.blogId,
        isActive: true,
      },
    });
    console.log(blog);
    if (!blog) return response(res, "No blogs found!", 404);

    response(res, blog);
  }
);
const updateValidator = Joi.object({
  title: Joi.string().min(4),
  content: Joi.string().min(3),
  user_id: Joi.number().min(1),
  image: Joi.string().min(3),
  isActive: Joi.boolean().default(true),
});
const updateBlogById = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: idErr, value: polishedId }: ValidationResult<ID> =
      idValidator.validate(req.params);
    if (idErr) return response(res, idErr.details[0].message, 409);

    let { error: bodyErr, value: body } = updateValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    let blog = await Blog.findOne({
      where: { id: polishedId.blogId, isActive: true },
    });
    if (!blog) return response(res, "No blogs found!", 404);
    blog.title = body.title ?? blog.title;
    blog.content = body.content ?? blog.content;
    blog.user_id = body.user_id ?? blog.user_id;
    blog.image = body.image ?? blog.image;
    blog.isActive = body.isActive ?? blog.isActive;
    await blog.save();
    response(res, blog);
  }
);

const deleteBlogsById = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: idErr, value: polishedId }: ValidationResult<ID> =
      idValidator.validate(req.params);
    if (idErr) return response(res, idErr.details[0].message, 409);
    let blogExists = await Blog.findOne({
      where: { id: polishedId.blogId, isActive: true },
    });
    if (!blogExists) return response(res, "No blogs found!", 404);

    await blogExists.update({ isActive: false });
    response(res, null, 204);
  }
);

const searchBlog = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let title = req.query.title || "";
    let limit = Number(req.query.limit);
    let page = Number(req.query.page);

    if (isNaN(limit) || limit < 1) limit = 10;
    if (isNaN(page) || page < 1) page = 1;

    let offset = (page - 1) * limit;
    let { count: totalBlogsCount, rows: totalBlogs } =
      await Blog.findAndCountAll({
        where: {
          title: {
            [Op.iLike]: `${title}%`,
          },
          isActive: true,
        },
        limit,
        offset,
      });
    if (totalBlogs.length === 0) return response(res, "No blogs found!", 404);
    let totalPages = Math.ceil(totalBlogsCount / limit);

    response(res, {
      totalPages,
      hasNextPage: page < totalPages,
      currentPage: page,
      totalBlogsCount,
      totalBlogs,
    });
  }
);
const joinValidator = Joi.object({
  parent_id: Joi.number().min(1).required(),
  blog_id: Joi.number().min(1),
  isActive: Joi.boolean().default(true),
});

const joinBlog = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: bodyErr, value: body } = joinValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    let { parent_id, blog_id, follower_id, isActive } = body;
    follower_id = req.user?.id;

    let [user, blog] = await Promise.all([
      User.findByPk(parent_id),
      Blog.findByPk(blog_id),
    ]);

    if (!user || !blog)
      return response(
        res,
        `Provided ${!user ? "user" : "blog"} not found!`,
        404
      );

    let joinedBlog = await Follower.create({
      parent_id,
      blog_id,
      follower_id,
      isActive,
    });
    response(res, joinedBlog, 201);
  }
);
const leaveBlog = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: idErr, value: polishedId }: ValidationResult<ID> =
      idValidator.validate(req.params);
    if (idErr) return response(res, idErr.details[0].message, 409);

    let blogExists = await Follower.findOne({
      where: {
        blog_id: polishedId.blogId,
        follower_id: req.user?.id,
        isActive: true,
      },
    });
    if (!blogExists) return response(res, "No follows found!", 404);
    await blogExists.update({ isActive: false });

    response(res, "You successfully unfollowed the blog!", 200);
  }
);

const getUsers = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { error: idErr, value: polishedId }: ValidationResult<ID> =
      idValidator.validate(req.params);
    if (idErr) return response(res, idErr.details[0].message, 409);
    let followers = await Follower.findOne({
      where: {
        blog_id: polishedId.blogId,
        isActive: true,
      },
    });
    if (!followers) return response(res, "No blogs found!", 404);
    response(res, followers);
  }
);

export {
  createBlog,
  getMyBlogs,
  getMyJoinedBlogs,
  getBlogInfo,
  updateBlogById,
  deleteBlogsById,
  searchBlog,
  joinBlog,
  leaveBlog,
  getUsers,
};
