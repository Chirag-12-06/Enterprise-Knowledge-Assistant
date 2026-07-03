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
console.log("Created document:", document._id);
    return document;
}

async function saveChunks(documentId, chunks) {
    const chunkDocuments = chunks.map((chunk, index) => ({
        documentId,
        chunkIndex: index,
        text: chunk,
        embedding: [],
        metadata: {
            page: null,
        },
    }));

    const result = await Chunk.insertMany(chunkDocuments);
console.log("Saved chunks:", result.length);
    return result.length;
}

module.exports = {
    createDocument,
    saveChunks,
};