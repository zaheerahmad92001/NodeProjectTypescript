import { NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import {
  ICategory,
  IProduct,
  ICategoryResponseParams,
  TypedRequestBody,
  TypedResponse,
} from "../../types";
import { VerifyToken } from "../helper";

const VerifyAuthToken = (
  req: TypedRequestBody<ICategory>,
  res: TypedResponse<ICategoryResponseParams>,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  const verifiedUser = VerifyToken(token);
  if (verifiedUser!!) {
    req.body.userId = verifiedUser as JwtPayload;
   return next();
  } else {
    return res.status(400).send({ messge: "invalid token", success: false });
  }
};
export { VerifyAuthToken };
