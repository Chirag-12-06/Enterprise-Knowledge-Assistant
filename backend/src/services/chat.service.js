const Chunk = require("../models/Chunk");
const { generateEmbeddings } = require("./embedding.service");

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
    ]);

    // Print scores while testing
    console.log(results.map(r => r.score));

    // Reject unrelated questions
    if (results.length === 0 || results[0].score < 0.75) {
        return [];
    }

    return results;
}

module.exports = {
    search,
};