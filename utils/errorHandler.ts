import { Request, Response, NextFunction } from "express";
import { response } from "./response";

const errorHandler = (func: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch((err: Error) => {
      response(res, err.message, 500);
    });
  };
};

export default errorHandler;
