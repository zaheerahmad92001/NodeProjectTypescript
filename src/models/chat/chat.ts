import mongoose from "mongoose";
import { IChat } from "../../../types";
const {Schema , model } = mongoose;

const schema = new Schema<IChat>({
    sender:{type:Schema.Types.ObjectId , required:true , ref:'Users'},
    receiver:{type:Schema.Types.ObjectId , required:true , ref:'Users'},
    message:{type:String},
    created:{type:Date , default: Date.now}  ,
    deleted:{type:Boolean , default:false},
    updated:{type:Date , default:Date.now},
})

const chat = model<IChat>('Chat',schema)
export {chat}


