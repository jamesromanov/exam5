import { Optional } from "sequelize";

export interface Comments {
  id?: number;
  title: string;
  user_id: number;
  post_id?: number;
  blog_id?: number;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
export interface CommentCreate
  extends Optional<Comments, "createdAt" | "updatedAt"> {}
