import { Response, Request, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import { response } from "../utils/response";
import User from "../models/user.model";
import Joi, { ValidationResult } from "joi";
import { UserHidden, UserLogin, Users } from "../types/User";
import bcrypt from "bcryptjs";

import env from "dotenv";
import jwt from "jsonwebtoken";
env.config();

const registerValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .min(5)
    .max(60)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  age: Joi.number().min(13).max(80).required(),
  password: Joi.string()
    .min(6)
    .max(20)
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
    .required(),
  role: Joi.string().default("user"),
  isActive: Joi.boolean().default(true),
});
const register = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { error: bodyErr, value: body }: ValidationResult<Users> =
      registerValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    let { name, email, age, password, role, isActive } = body;
    email = email.toLowerCase();

    let [nameChecking, emailChecking] = await Promise.all([
      User.findOne({ where: { name } }),
      User.findOne({ where: { email } }),
    ]);
    if (nameChecking || emailChecking) {
      return response(
        res,
        `${nameChecking ? "Name" : "Email"} already exists!`,
        409
      );
    }

    let user = await User.create({
      name,
      email,
      age,
      password,
      role,
      isActive,
    });
    let hiddenDetails = JSON.parse(JSON.stringify(user)) as UserHidden;
    delete hiddenDetails.role;
    delete hiddenDetails.password;
    delete hiddenDetails.isActive;
    response(res, hiddenDetails);
  }
);
const loginValidator = Joi.object({
  email: Joi.string().min(3).max(90).required(),
  password: Joi.string().min(3).max(20).required(),
});
const login = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { error: bodyErr, value: body }: ValidationResult<UserLogin> =
      loginValidator.validate(req.body);
    if (bodyErr) return response(res, bodyErr.details[0].message, 409);
    let { email, password } = body;
    let userExists = await User.findOne({
      where: { email },
    });
    if (!userExists) return response(res, "User not found!", 404);
    let validPassword = await bcrypt.compare(password, userExists.password);
    if (!validPassword) return response(res, "Invalid password!", 400);
    if (!process.env.ACCESS_TOKEN_EXP || !process.env.ACCESS_TOKEN_SECRET_KEY)
      return response(res, "Coundn't read the environment file!", 501);
    let token = jwt.sign(
      { id: userExists.id, role: userExists.role },
      process.env.ACCESS_TOKEN_SECRET_KEY as string,
      { expiresIn: eval(process.env.ACCESS_TOKEN_EXP) }
    );
    let options = {
      maxAge: eval(process.env.ACCESS_TOKEN_EXP),
      httpOnly: false,
    };

    res.cookie("jwt", token, options);
    response(res, "Successfully logged in!");
  }
);
export { register, login };
