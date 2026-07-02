const pdfService = require("../services/pdf.service");
const chunkService = require("../services/chunk.service");

exports.uploadPDF = async (req, res) => {
    try {

        const pdf = await pdfService.extractText(req.file.path);

        const chunks = chunkService.chunkText(pdf.text);

        res.json({
            success: true,
            pages: pdf.pages,
            totalChunks: chunks.length,
            firstChunk: chunks[0]
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            success: false,
            message: "Failed to process PDF"
        });

    }
};