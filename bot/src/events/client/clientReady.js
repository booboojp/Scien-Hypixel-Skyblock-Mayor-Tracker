const Discord = require('discord.js');
const ansis = require('ansis');
require('dotenv').config();	



module.exports = async (client) => {
    const startLogs = new Discord.WebhookClient({
        id: client.webhooks.startLogs.id,
        token: client.webhooks.startLogs.token,
    });
    console.log('TEST >> Client Ready command Did something! Yay!');

}