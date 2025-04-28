import { Response } from "express";

const response = (
  res: Response,
  data: object | string | unknown,
  sts = 200
) => {
  if (sts < 200 || sts > 205)
    res.status(sts).json({ status: "Failed!", err: data });
  else res.status(sts).json({ message: "Success!", data });
};

export { response };
