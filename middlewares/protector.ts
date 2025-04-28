import env from "dotenv";
import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";
import { RequestCustom, UserPro } from "../types/User";
env.config();

const protector = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer")
    )
      return response(res, "Token is invalid!", 401);

    let token = req.headers.authorization.split(" ")[1];

    let tokenValidation = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET_KEY!
    ) as JwtPayload;

    let userExists = (await User.findByPk(tokenValidation.id)) as UserPro;
    if (!userExists || !userExists.isActive)
      return response(res, "User not found!", 404);
    req.user = userExists;
    next();
  } catch (error) {
    if (error instanceof Error) {
      return response(res, error.message, 401);
    }
  }
};
export default protector;
