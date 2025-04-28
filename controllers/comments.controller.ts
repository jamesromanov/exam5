import { NextFunction, Response, Request } from "express";
import { RequestCustom, UserPro } from "../types/User";
import errorHandler from "../utils/errorHandler";
import { response } from "../utils/response";
import { ID } from "../types/id";
import User from "../models/user.model";
import Post from "../models/post.mode";
import Comment from "../models/comments";

const createComment = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let body = req.body;

    let post = await Post.findOne({
      where: {
        id: body.post_id,
      },
    });

    if (!post) return response(res, "No posts found!", 404);

    body.user_id = req.user?.id;

    let comment = await Comment.create(body);
    response(res, comment, 201);
  }
);

export { createComment };
