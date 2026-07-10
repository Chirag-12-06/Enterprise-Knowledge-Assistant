const Chunk = require("../models/Chunk");
const { generateEmbeddings } = require("./embedding.service");
const { generateAnswer } = require("./llm.service");
const Message = require("../models/Message");
const Conversation = require("../models/Conversation");

async function search(question, conversationId) {
  await Message.create({
    conversationId,
    role: "user",
    content: question,
  });

  const userMessageCount = await Message.countDocuments({
  conversationId,
  role: "user",
});

if (userMessageCount === 1) {
  await Conversation.findByIdAndUpdate(conversationId, {
    title:
      question.length > 40
        ? question.slice(0, 40) + "..."
        : question,
  });
}

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

  let response;
  // Reject unrelated questions
  if (results.length === 0 || results[0].score < 0.75) {
    response = {
      answer:
        "I couldn't find relevant information in the uploaded documents to answer that question.",
      sources: [],
      retrievedChunks: [],
    };
  } else {
    const relevantChunks = results.filter((chunk) => chunk.score >= 0.8);

    const context = relevantChunks.map((chunk) => chunk.text).join("\n\n");

    const answer = await generateAnswer(question, context);

    response = {
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
  
  await Message.create({
    conversationId,
    role: "assistant",
    content: response.answer,
    sources: response.sources,
    retrievedChunks: response.retrievedChunks,
  });

  return response;
}

module.exports = {
  search,
};
