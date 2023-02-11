import { NextFunction } from "express";
import { product } from "../../models/product/product";
import { catetory } from "../../models/category/category";
import { IProduct, TypedRequestBody, TypedResponse } from "../../../types";
import { Users } from "../../models/users";

class ProductController {
  async addProduct(
    req: TypedRequestBody<IProduct>,
    res: any,
    next: NextFunction
  ) {
    const { cat_id, product_name, retail_price, description, unit, userId } = req.body;
    const user = await Users.findById(userId.id).lean();
    if (user?.role === "admin" || user?.role === "manager") {
      const fomrData = new product({
        product_name,
        cat_id,
        retail_price,
        description,
        unit,
      });
      if (req.file) {
        fomrData.product_image = req.file.path;
      }
      product
        .create(fomrData)
        .then((result) => {
          return res.status(200).send(result);
        })
        .catch((error) => {
          return res.status(500).send(error);
        });
    } else {
      return res
        .status(500)
        .send({ message: "you not have permission", success: false });
    }
  }
}
export default new ProductController();
