import { NextFunction } from "express";
import { sale } from "../../models/sale/sale";
import { product } from "../../models/product/product";
import { ISale, TypedRequestBody, TypedResponse } from "../../../types";

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
}
export default new SaleController();
