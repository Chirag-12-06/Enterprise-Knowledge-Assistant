const OpenAI = require("openai");
const { buildRagPrompt } = require("../prompts/rag.prompt");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateAnswer(question, context) {
  const prompt = buildRagPrompt(question, context);

  const response = await client.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });
  return response.output_text;
}

module.exports = {
  generateAnswer,
};
