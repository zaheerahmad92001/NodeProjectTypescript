import { NextFunction } from "express";
import { product } from "../../models/product/product";
import { IStock, TypedRequestBody, TypedResponse } from "../../../types";
import { stock } from "../../models/stock/stock";
import { Users } from "../../models/users";

class StockController {
  async addStock(req: TypedRequestBody<IStock>, res: any, next: NextFunction) {
    const { product_id, actual_price, quentity, userId } = req.body;
    const user = await Users.findById(userId.id);

    if (user?.role != "admin") {
      return res.status(400).send({ message: "you dont have permission" });
    }
    if (!product_id) {
      return res
        .status(401)
        .send({ message: "please select product ", success: false });
    }
    if (!quentity) {
      return res
        .status(401)
        .send({ message: "product quentity is required", success: false });
    }
    const productFound = await product.findById(product_id).lean()
    if(productFound){
       return res.status(402).send({message:'product already exist you can update its record', success:false})
    }
    const stockObj = new stock({
      product_id,
      actual_price,
      quentity,
    });
    stock
      .create(stockObj)
      .then((result) => {
        return res
          .status(200)
          .send({ message: "stock updated", success: true });
      })
      .catch((error) => {
        return res.status(400).send({ message: error, success: false });
      });
  }
}
export default new StockController();
