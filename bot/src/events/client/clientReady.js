const Discord = require('discord.js');
const ansis = require('ansis');
require('dotenv').config();	



module.exports = async (client) => {
    const startLogs = new Discord.WebhookClient({
        id: client.startLogs.id,
        token: client.startLogs.token,
    });
    console.log('Client Ready command Did something')

    
}