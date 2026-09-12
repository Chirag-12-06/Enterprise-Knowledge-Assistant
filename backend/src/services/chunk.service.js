const Chunk = require("../models/Chunk");

function chunkText(
  text,
  chunkSize = 500,
  overlap = 100
) {
  const separators = ["\n\n", "\n", ". ", " ", ""];

  function splitRecursively(text, separatorIndex) {
    if (text.length <= chunkSize) {
      return [text.trim()];
    }

    if (separatorIndex >= separators.length) {
      return [text.slice(0, chunkSize).trim()];
    }

    const separator = separators[separatorIndex];

    let parts;

    if (separator === "") {
      parts = [...text];
    } else {
      parts = text.split(separator);
    }

    // If this separator cannot split the text meaningfully,
    // try the next separator.
    if (parts.length === 1) {
      return splitRecursively(text, separatorIndex + 1);
    }

    const chunks = [];
    let current = "";

    for (const part of parts) {
      const candidate = current
        ? current + separator + part
        : part;

      if (candidate.length <= chunkSize) {
        current = candidate;
      } else {
        if (current.trim()) {
          chunks.push(current.trim());
        }

        current = part;
      }
    }

    if (current.trim()) {
      chunks.push(current.trim());
    }

    return chunks;
  }

  const rawChunks = splitRecursively(text, 0);

  // Add overlap between chunks
  const finalChunks = [];

  for (let i = 0; i < rawChunks.length; i++) {
    if (i === 0) {
      finalChunks.push(rawChunks[i]);
      continue;
    }

    const previous = rawChunks[i - 1];

    const overlapText = previous
      .slice(-overlap);

    finalChunks.push(
      overlapText + " " + rawChunks[i]
    );
  }

  return finalChunks;
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