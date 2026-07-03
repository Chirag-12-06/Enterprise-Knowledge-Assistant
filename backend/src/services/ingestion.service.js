const pdfService = require("./pdf.service");
const chunkService = require("./chunk.service");
const documentService = require("./document.service");
const fs = require("fs/promises");

async function ingest(file) {
  try {
    const pdf = await pdfService.extractText(file.path);

    const chunks = chunkService.chunkText(pdf.text);

    const document = await documentService.createDocument(
      file.path,
      file.originalname,
    );

    const totalChunks = await documentService.saveChunks(document._id, chunks);

    await fs.unlink(file.path);

    return {
      documentId: document._id,
      pages: pdf.pages,
      totalChunks,
    };
  } catch (err) {
    // Optional cleanup if something failed
    try {
      await fs.unlink(file.path);
    } catch {}

    throw err;
  }
}

module.exports = {
  ingest,
};
