// export {}
// const Users = require("../../models/users");
import { NextFunction } from "express";
import { Users } from "../../models/users";
import {
  IUser,
  IUserRes,
  TypedRequestBody,
  TypedResponse,
  loginRequestParams,
  loginResponse,
  searchUserRequestParams,
} from "../../../types";
import * as bcrypt from "bcryptjs";
import * as AWS from "aws-sdk";
import * as fs from 'fs';
import { GenerateAccessToken } from "../../helper";
const {AWS_ACCESS_KEY_ID , AWS_SECRET_ACCESS_KEY ,AWS_BUCKET_NAME} = process.env;

const s3 = new AWS.S3({
  accessKeyId:AWS_ACCESS_KEY_ID,
  secretAccessKey:AWS_SECRET_ACCESS_KEY,
});
const BUCKET =AWS_BUCKET_NAME;

class UserController {
  async createUser(
    req: TypedRequestBody<IUser>,
    res: TypedResponse<Partial<IUserRes>>,
    next: NextFunction
  ) {
    const { email, name, age, password, role, otp, status } = req.body;
    console.log("typeof", typeof name);
    try {
      if (!req.body) {
        return res.status(400).send({ message: "Bad request", success: false });
      }
      const user = await Users.findOne({ email });
      if (user) {
        return res
          .status(400)
          .send({ message: "User already exit", success: false });
      }
      var salt = bcrypt.genSaltSync(10);
      var hash = bcrypt.hashSync(password!, salt);
      const newUser = new Users({
        name: name,
        password: hash,
        email: email,
        age: age,
        role: role,
        status: status,
        otp: otp,
      });
      if (req.file) {
        const filename = req.file.filename;
        const fileContent = fs.readFileSync(req.file.path);
        
        const uploadParams = {
          Bucket:BUCKET!,
          Key: `${filename}.jpg`,
          Body: fileContent,
      
        };

        s3.upload(uploadParams,function(error , data){
            if(error){
              console.log('error in uploading file',error)
            }else{
              console.log('here is file upload data', data)
            }
        })
        console.log("file",fileContent);
        newUser.file = req.file.path;
      }

      Users.create(newUser)
        .then((result) => {
          return res.json(result);
        })
        .catch((error: any) => {
          console.log("eror", error);
          return res
            .status(500)
            .send({ success: false, message: error.message });
        });
    } catch (error: any) {
      // console.log("error in users", error.message);`
      return res.status(400).send({ success: false, message: error.message });
    }
  }

  async login(
    req: TypedRequestBody<loginRequestParams>,
    res: TypedResponse<loginResponse>,
    next: NextFunction
  ) {
    const { email, password } = req.body;
    if (!req.body) {
      return res.status(400).send("credentials are required");
    }
    const findUser = await Users.findOne({ email }, { __v: 0 }).lean();
    if (!findUser) {
      return res.status(400).send("user not found");
    }
    if (bcrypt.compareSync(password, findUser.password)) {
      const token = GenerateAccessToken(findUser._id);
      return res
        .json({
          user: {
            ...findUser,
            created: findUser.created as Date,
            deleted: findUser.deleted as boolean,
            updated: findUser.updated as Date,
          },
          token,
        })
        .status(200);
    } else {
      return res.status(400).send("user not fount");
    }
  }

  async searchUsers(
    req: TypedRequestBody<searchUserRequestParams>,
    res: TypedResponse<any>,
    next: NextFunction
  ) {
    const { age, role, status } = req.body;
    let query: any = {};
    {
      age ? (query.age = { $eq: age }) : null;
      role ? (query.role = { $eq: role }) : null;
      status ? (query.status = { $in: ["rejected", "approved"] }) : null;
      // status ? (query.status = { $eq: status }) : null;
    }
    const users = await Users.find(query, {
      name: 1,
      age: 1,
      status: 1,
      role: 1,
    }).lean();
    if (users) return res.status(200).send(users);
    else return res.status(400).send({ message: "error", success: false });
  }
}
export default new UserController();

// module.exports = new userController();

// const createUser= async (req:Express.Request ,res:Express.Response,next:any)=>{
//   console.log(req.body)
//  const { email, name, age, password } = req.body;
//  console.log('User email is', email)
//     try {
//       if (!req.body) {
//         return res.status(400).send({ message: "Bad request", success: false });
//       }
//       const user = await Users.findOne({email});
//       console.log('User is',user)
//       if (user) {
//         return res
//           .status(400)
//           .send({ message: "User already exit", success: false });
//       }
//       const newUser =  new Users({
//         name: name,
//         email: email,
//         age: age,
//         password: password,
//       });
//       Users.create(newUser)
//         .then((data: any) => {
//           res.json({ data: data });
//         })
//         .catch((error:any) => {
//           console.log("eror", error?._message);
//           return res.status(500).send(error?._message)
//         });
//     } catch (error:any) {
//       console.log("error in users", error);
//       return res.status(400).send({success:false,message:error.message})
//     }

// }
// export {createUser}
