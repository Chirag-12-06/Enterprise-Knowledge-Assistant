const ingestionService = require("../services/ingestion.service");
const documentService = require("../services/document.service");

exports.uploadPDF = async (req, res) => {
  try {
    const result = await ingestionService.ingest(req.file);

    if (result.duplicate) {
      return res.status(409).json({
        success: false,
        duplicate: true,
        message: "This document has already been uploaded.",
        documentId: result.documentId,
      });
    }

    return res.status(201).json({
      success: true,
      duplicate: false,
      message: "Document uploaded and processed successfully.",
      ...result,
    });
  } catch (err) {
    console.error("[UPLOAD]", err);

    return res.status(500).json({
      success: false,
      message: "Failed to process PDF.",
    });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const documents = await documentService.getDocuments();

    res.json(documents);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const { id } = req.params;

    await documentService.deleteDocument(id);

    res.status(200).json({
      message: "Document deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: "Failed to delete document",
    });
  }
};
