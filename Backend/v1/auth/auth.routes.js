const express = require("express");
const { CreateUser, loginUser, RefreshToken } = require("./auth.controller");
const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Create a new user account.
 */
router.post("/signup", CreateUser);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user and get JWT token.
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh user authentication token.
 */
router.post("/refresh", RefreshToken);

module.exports = router;
