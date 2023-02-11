// export {}
// const Users = require("../../models/users");
import Express, { NextFunction } from "express";
import { Users } from "../../models/users";
import {
  IUser,
  IUserRes,
  TypedRequestBody,
  TypedResponse,
  loginRequestParams,
  loginResponse,
} from "../../../types";
import bcrypt from "bcryptjs";
import { GenerateAccessToken } from "../../helper";

class UserController {
  async createUser(
    req: TypedRequestBody<IUser>,
    res: TypedResponse<Partial<IUserRes>>,
    next: NextFunction
  ) {
    const { email, name, age, password, role, otp, status } = req.body;
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

  async Login(
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
