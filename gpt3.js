import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `This is theodore, a happy, fun man who goes for runs.

me:`;
const generateAction = async (input) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${input}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-ada-001",
    prompt: `${basePromptPrefix}${input}:`,
    temperature: 0.7,
    max_tokens: 250,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  console.log(basePromptOutput);
  return basePromptOutput;
};

export default generateAction;
