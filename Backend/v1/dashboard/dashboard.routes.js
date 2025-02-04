const express = require("express");
const dashboard = express.Router();
const vendor = require("./vendor.controller");
const categories = require("./categories");
const authenticateToken = require("../../middlewares/authenticateToken");
const {
  updateImage,
  deleteProduct,
  getAllProducts,
  importData,
  getCartData,
  deleteCartData,
  moveToCart,
  postProduct,
} = require("./dashboard.controller");

/**
 * @swagger
 * /dashboard/vendor:
 *   get:
 *     summary: Fetch vendor details.
 */
dashboard.get("/vendor", vendor);

/**
 * @swagger
 * /dashboard/categories:
 *   get:
 *     summary: Fetch all categories.
 */
dashboard.get("/categories", categories);

/**
 * @swagger
 * /dashboard/cartData:
 *   get:
 *     summary: Get user cart data.
 */
dashboard.get("/cartData", authenticateToken, getCartData);

/**
 * @
 * /dashboard/deleteItem/{id}:
 *   delete:
 *     summary: Delete item from cart.
 */
dashboard.delete("/deleteItem/:id", deleteCartData);

/**
 * @swagger
 * /dashboard/product/updateImage:
 *   put:
 *     summary: Update product image.
 */
dashboard.put("/product/updateImage", updateImage);

/**
 * @swagger
 * /dashboard/product/{productId}:
 *   delete:
 *     summary: Delete a product.
 */
dashboard.delete("/product/:productId", deleteProduct);

/**
 * @swagger
 * /dashboard/filterProduct:
 *   get:
 *     summary: Get all products with filtering.
 */
dashboard.get("/filterProduct", authenticateToken, getAllProducts);

/**
 * @swagger
 * /dashboard/import-data:
 *   post:
 *     summary: Import bulk product data.
 */
dashboard.post("/import-data", importData);

/**
 * @swagger
 * /dashboard/move-to-cart:
 *   post:
 *     summary: Move product to cart.
 */
dashboard.post("/move-to-cart", moveToCart);

/**
 * @swagger
 * /dashboard/product:
 *   post:
 *     summary: Add a new product.
 */
dashboard.post("/product", postProduct);

module.exports = dashboard;
