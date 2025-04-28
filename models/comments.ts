import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { FollowerCreate, Followers } from "../types/Follower";
import Blog from "./blog.model";
import { CommentCreate, Comments } from "../types/comments";

class Comment extends Model<Comments, CommentCreate> implements Comments {
  public id!: number;
  public title!: string;
  public user_id!: number;
  public post_id!: number;
  public blog_id!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public isActive!: boolean;
}
Comment.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    user_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    post_id: {
      type: DataTypes.NUMBER,
    },
    blog_id: {
      type: DataTypes.NUMBER,
    },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: "comments", timestamps: false }
);
Comment.belongsTo(Blog, { foreignKey: "blog_id" });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default Comment;
