const axios = require("axios");

async function generateEmbeddings(texts) {
    const response = await axios.post(EMBEDDING_API, {
        texts,
    });

    return response.data.embeddings;
}

module.exports = {
    generateEmbeddings,
};