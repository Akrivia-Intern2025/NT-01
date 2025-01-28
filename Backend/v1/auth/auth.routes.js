const express=require('express');
const { CreateUser, loginUser, RefreshToken } = require('./auth.controller');
const router=express.Router();
const authenticateToken = require('../../middlewares/authenticateToken');


router.post('/signup',authenticateToken,CreateUser );

router.post('/login',authenticateToken, loginUser);
router.post('/refresh',authenticateToken,RefreshToken)

module.exports = router;
