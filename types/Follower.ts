import { Optional } from "sequelize";

export interface Followers {
  parent_id: number;
  post_id?: number;
  blog_id?: number;
  follower_id: number;
  createdAt: Date;
}
export interface FollowerCreate extends Optional<Followers, "createdAt"> {}
