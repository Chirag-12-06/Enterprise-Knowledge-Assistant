const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const uploadController = require("../controllers/upload.controller");
const documentController = require("../controllers/document.controller");

router.post(
    "/",
    upload.single("file"),
    uploadController.uploadPDF
);

router.get("/", documentController.getDocuments);

module.exports = router;