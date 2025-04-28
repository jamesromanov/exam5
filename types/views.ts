import { Optional } from "sequelize";

export interface Views {
  id?: number;
  post_id: number;
  blog_id: number;
  views_count: number;
}
export interface ViewCreate extends Optional<Views, "id"> {}
