// const jwt = require('jsonwebtoken');
import * as jwt from "jsonwebtoken";
import { tokenParams } from "../../types";
const { JWT_SECRET } = process.env;

export const GenerateAccessToken = (data: tokenParams) => {
  return jwt.sign(
    { id: data },
    JWT_SECRET!, // ! non null assertion
    { expiresIn: "365d" }
  );
};

export const VerifyToken = (token: string):unknown => {

 return jwt.verify(token, JWT_SECRET!, function (err, decoded) {
    if (err) {
      return false;
    } else {
      return decoded;
    }
  });
};
