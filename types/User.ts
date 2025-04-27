import { Optional } from "sequelize";

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

export { Users, UsersCreate, UserLogin };
