import { NextFunction } from "express";
import { sale } from "../../models/sale/sale";
import { product } from "../../models/product/product";
import { ISale, TypedRequestBody, TypedResponse } from "../../../types";
import { Users } from "../../models/users";

class SaleController {
  async createSale(req: TypedRequestBody<ISale>, res: any, next: NextFunction) {
    const { product_id, quentity, userId } = req.body;

    if (!product_id) {
      return res
        .status(401)
        .send({ message: "product id is required", success: false });
    }
    const productDetail = await product.findById(product_id).lean();
    if (!quentity) {
      return res
        .status(401)
        .send({ message: "quantity is required", success: false });
    }
    var total_price = <number>quentity * <number>productDetail?.retail_price;
    const saleObj = new sale({
      product_id,
      user_id: userId.id,
      quentity,
      total_price,
    });
    sale
      .create(saleObj)
      .then((result) => {
        return res.status(200).send({ message: "data saved", success: true });
      })
      .catch((error) => {
        return res.status(401).send({ message: error, success: false });
      });
  }

  async saleDetail(req: TypedRequestBody<any>, res: any, next: NextFunction) {
    try {
      
      let userLookUp = await sale.aggregate([
        {
          // join with users collection
          $lookup: {
            from: "users",
            localField: "user_id",
            foreignField: "_id",
            as: "userSales",
          },
        },
        { $unwind: "$userSales" }, // $unwind used for getting data in object or for one record only
        // join with products collections
        {
          $lookup: {
            from: "products",
            localField: "product_id",
            foreignField: "_id",
            as: "products",
          },
        },
        // // define which fields are you want to fetch
        // {
        //   $project: {
        //     _id: 1,
        //     quentity: 1,
        //     userSales:1,
        //   },
        // },
      ]);
      return res.status(200).send(userLookUp);
    } catch (error) {
      return res.status(400).send({ message: error, success: false });
    }
  }
}
export default new SaleController();
