import { Query, Send, Params } from "express-serve-static-core";
import { ObjectId } from "mongodb";
import { Document, Types } from "mongoose";
import * as jwt from "jsonwebtoken"
import type { JwtPayload } from "jsonwebtoken";

export const roles = ["admin", "manager", "employee"];
export const status = ["pending", "approved", "rejected"];
export const units=["kg" , "mg"];
export type unitEnum = "kg"|"mg";
export type roleEnum = "admin" | "manager" | "employee";
export type statusEnum = "pending" | "approved" | "rejected";

export type IUserRes = {
  name: { first_name: string; last_name: string };
  role: roleEnum;
  status: statusEnum;
  email: string;
  age: string;
  password: string;
  file: Object;
  otp: string;
  created: Date;
  deleted: boolean;
  updated: Date;
  _id: Types.ObjectId;
  __v?: Number;
};
export type IUser = {
  name: { first_name: string; last_name: string };
  email: string;
  age: string;
  password: string;
  role: roleEnum;
  status: statusEnum;
  file: Object;
  otp: string;
  created?: Date;
  deleted?: boolean;
  updated?: Date;
};
export interface ICategory {
  categoryName: string;
  created: Date;
  deleted?: boolean;
  updated: Date;
  userId:JwtPayload, // comming from verifyAccessToken MW
}
export interface ICategoryResponseParams {
  categoryName: string;
  created: Date;
  deleted?: boolean;
  updated: Date;
  _id: Types.ObjectId;
  __v?: Number;
}
export type IProduct = {
  product_name: string;
  cat_id: Types.ObjectId;
  retail_price: Number;
  product_image:Object;
  description: string;
  unit: unitEnum;
  created: Date;
  deleted?: boolean;
  updated: Date;
  userId:JwtPayload, // comming from verifyAccessToken MW
};
export type IStock = {
  product_id: Types.ObjectId;
  actual_price: Number;
  quentity: Number;
  userId:Types.ObjectId,
  created: Date;
  deleted?: boolean;
  updated: Date;
};
export type ISale = {
  product_id: Types.ObjectId;
  user_id: Types.ObjectId;
  quentity: Number;
  total_price: Number;
  created: Date;
  deleted?: boolean;
  updated: Date;
  userId:JwtPayload, // comming from verifyAccessToken MW
};

export type tokenParams = {
    _id:Types.ObjectId
}

export type loginRequestParams ={
 email:string,
 password:string,
}
export type loginResponse={
    user: IUserRes
    token:string
}

export type categoryRequestParam={
  cat_id:Types.ObjectId
}

export interface TypedRequestBody<T> extends Express.Request {
  [x: string]: any;
  body: T;
}
export interface TypedRequestQuery<T extends Query> extends Express.Request {
  query: T;
}
export interface TypedRequest<T extends Query, U> extends Express.Request {
  body: U;
  query: T;
}
export interface TypedRequestParam<T extends Params> extends Express.Request {
  params: T;
}
export interface TypedResponse<ResBody> extends Express.Response {
  [x: string]: any;
  json: Send<ResBody, this>;
}
