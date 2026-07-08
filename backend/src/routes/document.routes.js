const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const documentController = require("../controllers/document.controller");

router.post(
    "/",
    upload.single("file"),
    documentController.uploadPDF
);

router.get("/", documentController.getDocuments);

router.delete("/:id", documentController.deleteDocument);

module.exports = router;