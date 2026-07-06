const Chunk = require("../models/Chunk");
const { generateEmbeddings } = require("./embedding.service");
const { generateAnswer } = require("./llm.service");

async function search(question) {
  const [queryEmbedding] = await generateEmbeddings([question]);

  const results = await Chunk.aggregate([
    {
      $vectorSearch: {
        index: "vector_index",
        path: "embedding",
        queryVector: queryEmbedding,
        numCandidates: 100,
        limit: 5,
      },
    },
    {
      $project: {
        _id: 0,
        documentId: 1,
        chunkIndex: 1,
        text: 1,
        score: {
          $meta: "vectorSearchScore",
        },
      },
    },
    {
      $lookup: {
        from: "documents",
        localField: "documentId",
        foreignField: "_id",
        as: "document",
      },
    },
    {
      $unwind: "$document",
    },
    {
      $project: {
        documentId: 1,
        documentTitle: "$document.title",
        chunkIndex: 1,
        text: 1,
        score: 1,
      },
    },
  ]);

  // Reject unrelated questions
  if (results.length === 0 || results[0].score < 0.75) {
    return [];
  }

  const relevantChunks = results.filter((chunk) => chunk.score >= 0.8);

  const context = relevantChunks.map((chunk) => chunk.text).join("\n\n");

  const answer = await generateAnswer(question, context);

  return {
    answer,

    sources: results.map((chunk) => ({
      document: chunk.documentTitle,
      chunk: chunk.chunkIndex,
      score: Number(chunk.score.toFixed(3)),
    })),

    retrievedChunks: results.map((chunk) => ({
      document: chunk.documentTitle,
      chunk: chunk.chunkIndex,
      score: Number(chunk.score.toFixed(3)),
      text: chunk.text,
    })),
  };
}

module.exports = {
  search,
};
