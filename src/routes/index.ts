// export {}
const express = require("express");
const route = express.Router();
// const userController = require('../controllers/users') //exports.module
// import { createUser } from "../controllers/users" // export
import UserController from "../controllers/users"; // class
import CategoryController from "../controllers/category";
import SaleController from "../controllers/sale";
import ProductController from "../controllers/product";
import StockController from "../controllers/stock";
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // to upload form data
// route.use(express.json()) // to upload raw json data
import { validateUserObject } from "../middleware/validateObject";
import { UserValidation } from "../validations/userValidation";
import { verifyAuthToken } from "../middleware/verifyAccessToken";
// import axios from "axios";
// const cheerio = require('cheerio');
// const http = require('http'); // or 'https' for https:// URLs
// const fs = require('fs');


route.post('/users/create/',upload.single('file'),validateUserObject(UserValidation), UserController.createUser)
route.get("/users/login/", upload.none(), UserController.login);
route.get("/users/search/",upload.none(),verifyAuthToken,UserController.searchUsers)
route.post("/category/create/",upload.none(),verifyAuthToken, CategoryController.createCategory);
route.get("/category/catProduct/" ,upload.none(),verifyAuthToken, CategoryController.categoryProduct)
route.post("/sale/create/",upload.none(),verifyAuthToken,SaleController.createSale);
route.get("/sale/detail/",upload.none(),verifyAuthToken,SaleController.saleDetail);
route.post("/product/", upload.single('file'),verifyAuthToken,ProductController.addProduct)
route.post("/stock/",upload.none(),verifyAuthToken,StockController.addStock)
export { route };
//  module.exports = route
