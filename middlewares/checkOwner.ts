import { NextFunction, Response } from "express";
import { RequestCustom } from "../types/User";
import Blog from "../models/blog.model";
import { response } from "../utils/response";
import { BlogOwner } from "../types/Blogs";

export const checkOwner = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    let blogId = req.params.id;
    let blogExists = await Blog.findOne({ where: { user_id: req.user?.id } });
    if (!blogExists) return response(res, "No blogs found!", 404);
    if (blogId) {
      let blog = (await Blog.findByPk(blogId)) as BlogOwner;
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
