import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { PostCreate, Posts } from "../types/posts";

class Post extends Model<Posts, PostCreate> implements Posts {
  public id!: number;
  public title!: string;
  public content!: string;
  public user_id!: number;
  public blog_id!: number;
  public image!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Post.init(
  {
    blog_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.STRING },
    user_id: {
      type: DataTypes.NUMBER,
    },
    image: { type: DataTypes.STRING },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: "posts", timestamps: true }
);
Post.hasMany(Post, { foreignKey: "id" });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default Post;
