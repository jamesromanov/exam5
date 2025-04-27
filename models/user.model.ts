import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db";
import validator from "validator";
import bcrypt from "bcryptjs";
import { Users, UsersCreate } from "../types/User";

class User extends Model<Users, UsersCreate> implements Users {
  public id!: number;
  public name!: string;
  public email!: string;
  public age!: number;
  public password!: string;
  public role!: string;
  public isActive!: boolean;
  public createdAt!: Date;
  public updatedAt!: Date;

  static async hashPassword(user: Users) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 12);
    }
  }
}
User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidEmail(value: string) {
          if (!validator.isEmail(value)) {
            throw new Error("Email is invalid!");
          }
        },
      },
    },
    age: { type: DataTypes.NUMBER, allowNull: false },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isStrongPassword(value: string) {
          if (!validator.isStrongPassword(value)) {
            throw new Error(
              "Password must be strong! Must contain one uppercase and lowercase and symbol one number at least!"
            );
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  { sequelize, tableName: "users", timestamps: true }
);

User.beforeCreate(User.hashPassword);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Table created successfully!");
  })
  .catch((err) => {
    console.log("Error while creating table:", err);
  });

export default User;
