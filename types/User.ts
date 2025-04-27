import { Optional } from "sequelize";

interface Users {
  toJSON(): unknown;
  id: number;
  name: string;
  email: string;
  age: number;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
interface UsersCreate
  extends Optional<Users, "id" | "createdAt" | "updatedAt"> {}

export { Users, UsersCreate };
