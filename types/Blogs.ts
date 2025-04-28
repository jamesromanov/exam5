import { Optional } from "sequelize";

export interface Blogs {
  title: string;
  content: string;
  user_id?: number;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface BlogCreate
  extends Optional<Blogs, "createdAt" | "updatedAt"> {}

export interface BlogOwner extends Blogs {
  id: number;
}
