const Discord = require('discord.js');
const { REST } =  require('discord.js');
const { Routes } = require('discord.js');
const fs = require('fs');
const ansis = require('ansis');
require('dotenv').config();	


module.exports = (client) => {
    const interactionLogs = new Discord.WebhookClient({
        id: client.webhooks.interactionLogs.id,
        token: client.webhooks.interactionLogs.token,
    });

    const commands = [];

    if (client.shard.ids[0] === 0) console.log(ansis.blue(ansis.bold(`System`)), (ansis.white(`>>`)), (ansis.green(`Loading commands`)), (ansis.white(`...`)))
    if (client.shard.ids[0] === 0) console.log(`\u001b[0m`);

    fs.readdirSync('./src/interactions').forEach(dirs => {
        const commandFiles = fs.readdirSync(`./src/interactions/${dirs}`).filter(files => files.endsWith('.js'));

        if (client.shard.ids[0] === 0) console.log(ansis.blue(ansis.bold(`System`)), (ansis.white(`>>`)), ansis.red(`${commandFiles.length}`), (ansis.green(`commands of`)), ansis.red(`${dirs}`), (ansis.green(`loaded`)));

        for (const file of commandFiles) {
            const command = require(`${process.cwd()}/src/interactions/${dirs}/${file}`);
            client.commands.set(command.data.name, command);
            commands.push(command.data);
        };
    });

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
}