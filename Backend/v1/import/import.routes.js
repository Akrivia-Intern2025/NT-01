const express = require("express");
const router = express.Router();
const { fileUploadToTable, getDataFromTable } = require("./import.controller");

/**
 * @swagger
 * /imports/upload-file:
 *   post:
 *     summary: Uploads a file and stores data in the table.
 *     responses:
 *       200:
 *         description: File uploaded successfully.
 */
router.post("/upload-file", fileUploadToTable);

/**
 * @swagger
 * /imports/getData/{id}:
 *   get:
 *     summary: Retrieves data from the table by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Data retrieved successfully.
 */
router.get("/getData/:id", getDataFromTable);

module.exports = router;
