function chunkText(text, chunkSize = 500, overlap = 100) {
    const words = text.split(/\s+/);

    const chunks = [];

    let index = 0;

    while (index < words.length) {
        const chunk = words
            .slice(index, index + chunkSize)
            .join(" ");

        chunks.push(chunk);

        index += chunkSize - overlap;
    }

    return chunks;
}

async function saveChunks(documentId, chunks, embeddings) {
  const chunkDocuments = chunks.map((chunk, index) => ({
    documentId,
    chunkIndex: index,
    text: chunk,
    embedding: embeddings[index],
    metadata: {
      page: null,
    },
  }));

  const result = await Chunk.insertMany(chunkDocuments);
  return result.length;
}

module.exports = {
    chunkText,
    saveChunks,
};