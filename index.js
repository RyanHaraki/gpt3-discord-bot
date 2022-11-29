import { Client, GatewayIntentBits } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
dotenv.config();

// OPENAPI STUFF
const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// CONSTANTS
const basePromptPrefix = `This is theodore, a happy, fun man who goes for runs.`;
const personalities = [
  "Elon Musk",
  "Steve Jobs",
  "Bill Gates",
  "Batman",
  "Spiderman",
];

// DISCORD BOT CODE

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log("Bot is ready");
});

client.on("messageCreate", async (message) => {
  if (message.content.includes("hey bot".toLowerCase())) {
    // TODO: COMMENT ON HOW THSI ALL WORKS
    const response = await openai.createCompletion({
      model: "text-ada-001",
      prompt: `${basePromptPrefix}${message.content.replace(
        "hey bot",
        "wait"
      )}:`,
      temperature: 0.7,
      max_tokens: 250,
    });

    const basePromptOutput = response.data.choices.pop();

    if (basePromptOutput) {
      message.reply(basePromptOutput.text);
    } else {
      message.reply("ERROR: bot failed to respond");
    }
  }
});

client.login(process.env.DISCORD_BOT_TOKEN);
