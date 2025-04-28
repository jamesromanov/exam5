import { NextFunction, Response, Request } from "express";
import { RequestCustom, UserPro } from "../types/User";
import errorHandler from "../utils/errorHandler";
import Joi, { ValidationResult } from "joi";
import { Blogs } from "../types/Blogs";
import { response } from "../utils/response";
import Blog from "../models/blog.model";

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
    let parentId = req.user?.id;
  }
);
export { createBlog, getMyBlogs };
