import { NextFunction } from "express";
import { catetory } from "../../models/category/category";
import { Users } from "../../models/users";
import { product } from "../../models/product/product";
import {
  ICategory,
  ICategoryResponseParams,
  TypedRequestBody,
  TypedResponse,
} from "../../../types";

class CategoryController {
  async createCategory(
    req: TypedRequestBody<ICategory>,
    res: TypedResponse<ICategoryResponseParams>,
    next: NextFunction
  ) {
    const { categoryName, userId } = req.body;
    const user = await Users.findById(userId.id);
    if (categoryName.trim().length === 0) {
      return res
        .status(501)
        .send({ message: "category name required", success: false });
    }
    if (user?.role === "admin") {
      const _category = new catetory({
        categoryName: categoryName,
      });
      catetory
        .create(_category)
        .then((result) => {
          return res.status(200).send({ result, success: true });
        })
        .catch((err) => {
          return res.status(500).send({ message: err, success: false });
        });
    } else {
      return res.status(403).send({
        message: "you don`t have permission to add category",
        success: false,
      });
    }
  }

async categoryProduct(
   req: TypedRequestBody<any>,
    res: TypedResponse<any>,
    next: NextFunction
){
  try{
  let catProducts = await catetory.aggregate([
    {
      $lookup:{
        from: "products",
            localField:"_id",
            foreignField:"cat_id",
            as: "cateProduct"
      }
    }
  ])
  // let catProducts = await product.find({}).populate("cat_id")
  return res.status(200).send(catProducts)
  }catch(error){
    console.log('errro',error)
    return res.status(400).send({message:'success false' , success:false})
  }
}


}
export default new CategoryController();
