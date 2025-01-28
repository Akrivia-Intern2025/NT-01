const express=require("express");
const { getUrl, profileUpdate ,getFiles,downloadZip} = require("./aws.controller");
const router=express.Router();
const authenticateToken =  require("../../middlewares/authenticateToken");

router.post("/get-presigned-url",authenticateToken,getUrl);
router.post("/update-profile-pic",authenticateToken,profileUpdate);
router.get('/getfiles',authenticateToken,getFiles);
router.get('/download-zip',authenticateToken,downloadZip);

module.exports=router;