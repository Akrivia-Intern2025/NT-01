const express = require("express");
const dashboard = express.Router();
const multer = require("multer");
const vendor = require("./vendor.controller");
const categories = require("./categories");
const {
  updateimage,
  deleteProduct,
  getAllProducts,
  importData,
  getCartData,
  deleteCartData,
} = require("./product.controller");
const authenticateToken = require("../../middlewares/authenticateToken");
const upload = multer({ dest: "uploads/" });

dashboard.get("/vendor", vendor);
dashboard.get("/categories", categories);
dashboard.get("/cartData", authenticateToken, getCartData);
dashboard.delete("/deleteItem/:id", deleteCartData);
dashboard.put("/product/updateimage", updateimage);
dashboard.delete("/product/:productId", deleteProduct);
dashboard.get("/filterProduct", authenticateToken, getAllProducts);
dashboard.post("/import-data", importData);

module.exports = dashboard;
