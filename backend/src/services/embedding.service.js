const axios = require("axios");

const EMBEDDING_API = process.env.EMBEDDING_API

async function generateEmbeddings(texts) {
    const response = await axios.post(EMBEDDING_API, {
        texts,
    });

    return response.data.embeddings;
}

module.exports = {
    generateEmbeddings,
};