const axios = require("axios");

const EMBEDDING_API = "http://127.0.0.1:8000/embed";

async function generateEmbeddings(texts) {
    const response = await axios.post(EMBEDDING_API, {
        texts,
    });

    return response.data.embeddings;
}

module.exports = {
    generateEmbeddings,
};