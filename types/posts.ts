import { Optional } from "sequelize";

export interface Posts {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  image: string;
  isActive: boolean;
  blog_id: number;
  createdAt: Date;
  updatedAt: Date;
}
export interface PostCreate
  extends Optional<Posts, "createdAt" | "updatedAt"> {}

export interface PostUpdate {
  id?: number;
  title?: string;
  content?: string;
  user_id?: number;
  image?: string;
  isActive?: boolean;
  blog_id?: number;
}
