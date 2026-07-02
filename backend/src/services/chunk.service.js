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

module.exports = {
    chunkText,
};