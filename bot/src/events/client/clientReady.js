const Discord = require('discord.js');
const ansis = require('ansis');
require('dotenv').config();	



module.exports = async (client) => {
    const startLogs = new Discord.WebhookClient({
        id: client.webhooks.startLogs.id,
        token: client.webhooks.startLogs.token,
    });
    const embed = new Discord.EmbedBuilder()
            .setTitle(`🚨・Client Ready`)
            .addFields([
                {
                    name: `The Client is ready!`,
                    value: `^w^`,
                },
            ])
            .setColor(client.config.colors.normal)
    startLogs.send({
        username: 'Bot Logs',
        embeds: [embed],
    }).catch(() => {
        console.log('Error sending warning to webhook')
        console.log(warn)
    })
    console.log('TEST >> Client Ready command Did something! Yay!');

}   