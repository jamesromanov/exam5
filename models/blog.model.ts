import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import { BlogCreate, Blogs } from "../types/Blogs";

class Blog extends Model<Blogs, BlogCreate> implements Blogs {
  public id!: number;
  public title!: string;
  public content!: string;
  public user_id!: number;
  public image!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Blog.init(
  {
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
  { sequelize, tableName: "blogs", timestamps: true }
);
Blog.hasMany(Blog, { foreignKey: "id" });
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    // console.log("Error while creating table:", err);
  });

export default Blog;
