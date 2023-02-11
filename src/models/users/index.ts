// export {}
// const mongoose = require('mongoose')
// let validator = require('validator')
import mongoose from "mongoose";
import validator from 'validator';
import { IUser } from "../../../types";

const {Schema} = mongoose
const schema = new Schema<IUser>({
    name:{
        first_name:{type: String, required: true, maxlength:10, minlength:1,},
        last_name:{type: String, maxlength:10,minlength:0,}
    },
    role:{ type:String,required:true, enum:['admin', 'manager', 'employee']},
    status:{ type:String, require:true, enum:['pending', 'approved' , 'rejected']},
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase: true,
        validate: (value:string) => { return validator.isEmail(value)}
    },
    age:{type:String,required:true,},
    password:{type:String,required:true,},
    otp:{type:String,maxlength:6,default:''},
    file:{type:Object},
    created:{type:Date , default:Date.now},
    deleted:{type:Boolean , default:false},
    updated:{type:Date , default:Date.now},
})
const Users = mongoose.model<IUser>('Users',schema)  // Users is collection name
// module.exports = users
export {Users}