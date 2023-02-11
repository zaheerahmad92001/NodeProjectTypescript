import mongoose from "mongoose";
const {Schema, model} = mongoose;
import { ISale } from "../../../types";

const schema = new Schema<ISale>({
  product_id:{type:Schema.Types.ObjectId , ref:'Product'},
  user_id:{type:Schema.Types.ObjectId , ref:'Users'},
  quentity:{type:Number , required:true},
  total_price:{type:Number,required:true},
  created:{type:Date , default:Date.now},
  deleted:{type:Boolean , default:false},
  updated:{type:Date , default:Date.now},
})
const sale = model<ISale>('Sale', schema)
export {sale}