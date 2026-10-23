const pdfService = require("./pdf.service");
const chunkService = require("./chunk.service");
const documentService = require("./document.service");
const embeddingService = require("./embedding.service");
const calculateFileHash = require("../utils/fileHash");
const fs = require("fs/promises");
const path = require("path");

async function ingest(file) {
  if (!file) {
    throw new Error("No file received");
  }

  const filePath = path.resolve(file.path);

  try {
    // 1. Calculate the PDF's unique hash
    const fileHash = await calculateFileHash(filePath);

    // 2. Check whether this PDF already exists
    const existingDocument =
      await documentService.findByFileHash(fileHash);

    if (existingDocument) {
      return {
        duplicate: true,
        documentId: existingDocument._id,
        message: "This document has already been uploaded.",
      };
    }

    // 3. Extract text from the PDF
    const pdf = await pdfService.extractText(filePath);

    // 4. Split the text into chunks
    const chunks = chunkService.chunkText(pdf.text);

    // 5. Generate embeddings
    const embeddings =
      await embeddingService.generateEmbeddings(chunks);

    // 6. Save the document and its hash
    const document = await documentService.createDocument(
      filePath,
      file.originalname,
      fileHash,
    );

    // 7. Save chunks and embeddings
    const totalChunks = await chunkService.saveChunks(
      document._id,
      chunks,
      embeddings,
    );

    // 8. Update the document's chunk count
    await documentService.updateChunkCount(
      document._id,
      totalChunks,
    );

    return {
      duplicate: false,
      documentId: document._id,
      pages: pdf.pages,
      totalChunks,
    };
  } finally {
    // 9. Delete the temporary upload after processing
    await fs.unlink(filePath).catch(() => {});
  }
}

module.exports = { ingest };