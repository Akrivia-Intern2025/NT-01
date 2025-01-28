const express=require('express');
const {updateUser, deleteUser, getAllUsers,getUser } = require('./user.controller');
const authenticateToken = require('../../middlewares/authenticateToken');
const router=express.Router();

router.get('/userdata',authenticateToken,getUser);
router.put('/update/:id',authenticateToken, updateUser)

router.delete('/delete/:id',authenticateToken, deleteUser);

router.get('/getAll',authenticateToken, getAllUsers);

module.exports = router;

