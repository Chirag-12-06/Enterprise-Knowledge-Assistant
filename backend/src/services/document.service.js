const path = require("path");

const Document = require("../models/Document");
const Chunk = require("../models/Chunk");

async function createDocument(filePath, originalFileName) {
  const title = path.parse(originalFileName).name;

  const document = await Document.create({
    title,
    originalFileName,
    uploadedBy: "system",
  });
  return document;
}

async function getDocuments() {
  return await Document.find({}, "title originalFileName chunkCount createdAt").lean();
}

async function updateChunkCount(documentId, count) {
  await Document.findByIdAndUpdate(documentId, {
    chunkCount: count,
  });
}

async function deleteDocument(documentId) {
  await Chunk.deleteMany({
    documentId,
  });

  await Document.findByIdAndDelete(documentId);
}

module.exports = {
  createDocument,
  getDocuments,
  updateChunkCount,
  deleteDocument,
};
