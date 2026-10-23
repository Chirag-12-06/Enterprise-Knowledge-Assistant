const path = require("path");

const Document = require("../models/Document");
const Chunk = require("../models/Chunk");

async function findByFileHash(fileHash) {
  return Document.findOne({ fileHash });
}

async function createDocument(filePath, originalFileName, fileHash) {
  const title = path.parse(originalFileName).name;

  const document = await Document.create({
    title,
    originalFileName,
    fileHash,
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
  findByFileHash,
};
