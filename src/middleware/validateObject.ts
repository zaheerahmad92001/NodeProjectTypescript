// if you need other input parameters for you business logic deviating 
// from (req, res, next)? For example, if you want to hand over some configuration values to feed your logic?
// To achieve this, you can use a simple but efficient pattern: wrap your actual middleware 
// function with a second one that receives the desired parameters,  like so.

// const paramMiddleware = (myParam) => {
//   return (req, res, next) => {
//     // implement your business logic using 'myParam'
//     // ...
//     next();
//   }
// }

import { Request , Response , NextFunction } from 'express';
import { TypedRequestBody , TypedResponse, IUser, IUserRes} from '../../types';
import {UserValidation} from '../validations/userValidation'

const validateUserObject=(resourceSchema:typeof UserValidation)=> async (req:TypedRequestBody<IUser>, res:TypedResponse<IUserRes>, next:NextFunction)=>{
    const {body} = req
    console.log('body', body)
    body.name=JSON.parse(body.name.toString())
    resourceSchema.validate(body,{ abortEarly: false }).then((isValid)=>{
          next()
    })
    .catch((error)=>{
        res.status(400).send({ message:error.errors, success: false });
        return false
    })
    return false
}
export {validateUserObject}