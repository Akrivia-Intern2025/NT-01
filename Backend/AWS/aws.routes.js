const express = require("express");
const {
  getUrl,
  profileUpdate,
  getFiles,
  downloadZip,
} = require("./aws.controller");
const router = express.Router();

/**
 * @swagger
 * /api/get-presigned-url:
 *   post:
 *     summary: Get a pre-signed URL for file upload.
 */
router.post("/get-presigned-url", getUrl);

/**
 * @swagger
 * /api/update-profile-pic:
 *   post:
 *     summary: Update user profile picture.
 */
router.post("/update-profile-pic", profileUpdate);

/**
 * @swagger
 * /api/getfiles/{id}:
 *   get:
 *     summary: Get all files for a user.
 */
router.get("/getfiles/:id", getFiles);

/**
 * @swagger
 * /api/download-zip:
 *   get:
 *     summary: Download multiple files as a ZIP archive.
 */
router.get("/download-zip", downloadZip);

module.exports = router;
