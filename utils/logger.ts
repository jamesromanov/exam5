import { NextFunction, Response } from "express";
import Logger from "../models/logger.model";
import { RequestCustom } from "../types/User";

const logGer = async (
  req: RequestCustom,
  res: Response,
  next: NextFunction
) => {
  let time = new Date().toString();
  let method = req.method;
  let ip = req.ip;
  let log = await Logger.create({ time, method, ip });
  next();
};
export default logGer;
