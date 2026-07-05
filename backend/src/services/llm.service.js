const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAnswer(question, context) {
  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: `
You are an AI assistant.
Answer the user's question ONLY using the provided context.
If the answer cannot be found in the context, reply exactly:
"I couldn't find that information in the uploaded documents."
Context:
${context}

Question:
${question}
        `,
  });

  return response.output_text;
}

module.exports = {
  generateAnswer,
};
