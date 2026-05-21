require("dotenv").config();
const { Client } = require("discord.js");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const client = new Client();

client.on("message", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("!generate ")) {
    const prompt = message.content.slice(10).trim();

    if (!prompt) {
      return message.reply("empty");
    }

    const loadingMsg = await message.reply("b patient");

    try {
  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?model=flux&width=1024&height=1024&nologo=true`;

  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  await loadingMsg.delete();
  await message.channel.send(`ur ${prompt}`, {
    files: [{ attachment: buffer, name: "image.png" }],
  });
} catch (error) {
  console.error("Error:", error.message);
  await loadingMsg.edit(`fail`);
}
  }
});

client.login(process.env.DISCORD_TOKEN)
