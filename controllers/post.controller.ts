import { NextFunction, Response } from "express";
import errorHandler from "../utils/errorHandler";
import Post from "../models/post.mode";
import { response } from "../utils/response";
import { RequestCustom } from "../types/User";
import View from "../models/veiws";
import { Posts, PostUpdate } from "../types/posts";

const create = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let blogId = req.params.blogId;
    console.log(blogId);
    let { title, content, image, user_id, isActive, blog_id } = req.body;
    user_id = req.user?.id;
    blog_id = req.params.blogId;
    let post = await Post.create({
      title,
      content,
      image,
      user_id,
      isActive,
      blog_id,
    });
    response(res, post, 201);
  }
);

const getAll = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let blogId = req.params.blogId;
    let posts = await Post.findAll({ where: { blog_id: blogId } });
    if (!posts) return response(res, "No posts found!", 404);

    response(res, posts);
  }
);

const getById = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let postId = req.params.postId;

    let post = await Post.findByPk(postId);
    if (!post) return response(res, "Post not found!", 404);
    let views = await View.findOne({
      where: { post_id: postId, blog_id: post.blog_id },
    });
    console.log(views?.views_count);
    if (!views) {
      await View.create({
        post_id: post.id,
        blog_id: post.blog_id,
        views_count: 0,
      });
    } else {
      let viewsCount = +views.views_count;
      await views.update({ views_count: (viewsCount += 1) });
    }
    response(res, post);
  }
);

const updatePost = errorHandler(
  async (req: RequestCustom, res: Response, next: NextFunction) => {
    let body = req.body;

    let post = await Post.findOne({
      where: { id: req.params.postId },
    });
    if (!post) return response(res, "Post not found!", 404);

    post.title = body.title ?? post?.title;
    post.content = body.content ?? post?.content;
    post.image = body.image ?? post?.image;
    post.isActive = body.isActive ?? post?.isActive;
    post.blog_id = body.blog_id ?? post?.blog_id;
    await post.save();
    response(res, post);
  }
);
export { create, getAll, getById, updatePost };
