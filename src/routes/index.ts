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
import { VerifyAuthToken } from "../middleware/verifyAccessToken";
import axios from "axios";
const cheerio = require('cheerio');
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');


route.get("/users/", upload.none(), UserController.Login);
route.post("/category/",upload.none(),VerifyAuthToken, CategoryController.createCategory);
route.post("/sale/",upload.none(),VerifyAuthToken,SaleController.createSale);
route.post("/product/", upload.single('file'),VerifyAuthToken,ProductController.addProduct)
route.post("/stock/",upload.none(),VerifyAuthToken,StockController.addStock)

// route.post('/users/', userController.createUser)
export { route };
//  module.exports = route
