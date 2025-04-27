import { Response, Request, NextFunction } from "express";
import errorHandler from "../utils/errorHandler";
import { response } from "../utils/response";
import User from "../models/user.model";
import Joi from "joi";
import { Users } from "../types/User";

const registerValidator = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .min(5)
    .max(60)
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  age: Joi.number().min(13).required(),
  password: Joi.string()
    .min(6)
    .max(16)
    .regex(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
    .required(),
  role: Joi.string().default("user"),
  isActive: Joi.boolean().default(true),
});
const register = errorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let { error: bodyErr, value: body } = registerValidator.validate(req.body);
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
        502
      );
    }

    let user = await User.create(body);
    let hiddenDetails: Omit<Users, "role" | "password" | "isActive"> = {
      ...user,
    };
    response(res, hiddenDetails);
  }
);
export { register };
