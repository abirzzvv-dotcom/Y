'use strict';

const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
const API_URL = 'https://your.api/endpoint'; // Replace with your API endpoint
const API_KEY = 'img_496690b50cc9ee4e212f6c2f34f77b8845e0599caa8c31293c883ea999ada4b2';

client.on('message', async (message) => {
    if (message.content.startsWith('!gen ')) {
        const prompt = message.content.slice(5);
        try {
            const response = await axios.post(API_URL, {
                prompt: prompt
            }, {
                headers: {
                    'Authorization': `Bearer ${API_KEY}`
                }
            });
            // Assume response.data.url contains the image URL
            message.channel.send(response.data.url);
        } catch (error) {
            console.error(error);
            message.channel.send('Something went wrong!');
        }
    }
});

client.login('your-discord-bot-token'); // Replace with your Discord bot token