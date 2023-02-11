import mongoose from "mongoose";
const {Schema , model} =mongoose;
import { IProduct, units } from "../../../types";

const schema = new Schema<IProduct>({
 product_name:{type:String,required:true},
 cat_id:{type:Schema.Types.ObjectId , ref:'Category'},
 retail_price:{type:Number},
 product_image:{type:Object},
 description:{type:String},
 unit:{type:String,required:true,enum:units},
 created:{type:Date , default:Date.now},
 deleted:{type:Boolean , default:false},
 updated:{type:Date , default:Date.now},
})
const product = model<IProduct>('Product',schema)
export {product}