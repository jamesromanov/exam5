import { NextFunction, Response } from "express";
import { RequestCustom } from "../types/User";
import Blog from "../models/blog.model";
import { response } from "../utils/response";
import { BlogOwner } from "../types/Blogs";
import Joi, { ValidationResult } from "joi";
import { ID } from "../types/id";
const idValidator = Joi.object({
  blogId: Joi.number().min(1).required(),
});
export const checkOwner = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    let blogId = req.params.blogId;
    let blogExists = await Blog.findOne({ where: { user_id: req.user?.id } });
    if (!blogExists) return response(res, "No blogs found!", 404);
    if (blogId) {
      let { error: idErr, value: polishedId }: ValidationResult<ID> =
        idValidator.validate(req.params);
      if (idErr) return response(res, idErr.details[0].message, 409);
      let blog = (await Blog.findByPk(blogId)) as BlogOwner;
      if (!blog) return response(res, "Blog not found!", 404);
      if (blog.user_id !== req.user?.id)
        return response(res, "You dont have rights to do that!", 401);
    }
    next();
  } catch (error) {
    if (error instanceof Error) {
      return response(res, error.message, 401);
    }
  }
};
