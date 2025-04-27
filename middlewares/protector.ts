import env from "dotenv";
import { NextFunction, Request, Response } from "express";
import { response } from "../utils/response";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";
env.config();

const protector = async (req: Request, res: Response, next: NextFunction) => {
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
  console.log(token, tokenValidation);

  let userExists = await User.findByPk(tokenValidation.id);
  console.log(userExists?.dataValues);
  next();
};
export default protector;
