const ingestionService = require("../services/ingestion.service");

exports.uploadPDF = async (req, res) => {
    try {
        const result = await ingestionService.ingest(req.file);

        console.log("Result:", result);

        res.json({
            success: true,
            ...result,
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to process PDF",
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