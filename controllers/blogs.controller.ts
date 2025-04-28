import { NextFunction, Response, Request } from "express";
import { RequestCustom, UserPro } from "../types/User";
import errorHandler from "../utils/errorHandler";
import Joi, { ValidationResult } from "joi";
import { BlogOwner, Blogs } from "../types/Blogs";
import { response } from "../utils/response";
import Blog from "../models/blog.model";
import Follower from "../models/follower.model";
import { ID } from "../types/id";
import { Op } from "sequelize";

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

    blogExists.isActive = false;
    await blogExists.save();
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
export {
  createBlog,
  getMyBlogs,
  getMyJoinedBlogs,
  getBlogInfo,
  updateBlogById,
  deleteBlogsById,
  searchBlog,
};
