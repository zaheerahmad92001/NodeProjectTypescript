import mongoose from "mongoose";
const {Schema , model} = mongoose;
import { IStock } from "../../../types";

const schema = new Schema<IStock>({
 product_id:{type:Schema.Types.ObjectId ,ref:'Product'},
 actual_price:{type:Number, required:true , default:0},
 quentity:{type:Number,required:true},
})
const stock = model<IStock>('Stock', schema);
export {stock}