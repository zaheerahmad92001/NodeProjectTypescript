import mongoose from "mongoose";
const {Schema ,model} = mongoose;
 import { ICategory } from "../../../types";
 
const schema = new Schema<ICategory>({
    categoryName:{type:String , require:[true,'category name required'], unique:true},
    created:{type:Date , default:Date.now},
    deleted:{type:Boolean , default:false},
    updated:{type:Date , default:Date.now},
})

const catetory = model<ICategory>('Category' , schema)
export {catetory}

