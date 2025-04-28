import { Optional } from "sequelize";
import { Request } from "express";

interface Users {
  name: string;
  email: string;
  age: number;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface UsersCreate extends Optional<Users, "createdAt" | "updatedAt"> {}

interface UserLogin {
  email: string;
  password: string;
}

interface UserHidden {
  name: string;
  email: string;
  age: number;
  password?: string;
  role?: string;
  isActive?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface UserPro extends Users {
  id: number;
}
interface RequestCustom extends Request {
  user?: UserPro;
}

export { Users, UsersCreate, UserLogin, UserHidden, UserPro, RequestCustom };
