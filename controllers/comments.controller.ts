import { NextFunction, Response, Request } from "express";
import { RequestCustom, UserPro } from "../types/User";
import errorHandler from "../utils/errorHandler";
import { response } from "../utils/response";
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

const updateCommentByid = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let { title, user_id, post_id, isActive } = req.body;

    let id = +req.params.commentId as number;

    let comment = await Comment.findOne({
      where: {
        id,
        isActive: true,
        user_id: req.user?.id,
      },
    });

    if (!comment) return response(res, "No comments found!", 404);

    comment.title = title ?? comment?.title;
    comment.user_id = user_id ?? comment?.user_id;
    comment.post_id = post_id ?? comment?.post_id;
    comment.isActive = isActive ?? comment?.isActive;

    await comment.save();

    response(res, comment);
  }
);
const deleteByid = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let id = +req.params.commentId as number;

    let comment = await Comment.findOne({
      where: {
        id,
        isActive: true,
        user_id: req.user?.id,
      },
    });

    if (!comment) return response(res, "No comments found!", 404);
    await comment.update({ isActive: false });

    await comment.save();

    response(res, null, 204);
  }
);

export { createComment, updateCommentByid, deleteByid };
