function buildRagPrompt(question, context) {
    return `
You are an AI assistant.

Answer ONLY using the provided context.

Instructions:
- Give a detailed answer.
- If the answer isn't in the context, reply:
  "I couldn't find that information in the uploaded documents."
- Don't make assumptions.
- Format the answer using paragraphs and bullet points when appropriate.

Context:
${context}

Question:
${question}
`;
}

module.exports = {
    buildRagPrompt,
};