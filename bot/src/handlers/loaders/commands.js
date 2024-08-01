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
            
            try {
                commands.push(command.data);
                interactionLogs.send({
                    username: 'Bot Logs',
                    embeds: [
                        new Discord.EmbedBuilder()
                            .setTitle(`Loaded command: ${command.data.name}`)
                            .addFields(
                                { name: 'Name', value: command.data.name },
                                { name: 'Description', value: command.data.description },
                                { name: 'Type', value: command.data.type },
                                { name: 'Category', value: command.data.category }
                            )
                            .setColor(client.config.colors.normal.toString())
                    ]
                }).then(() => {
                    console.log(ansis.blue(ansis.bold(`System`)), (ansis.white(`>>`)), (ansis.green(`Command`)), (ansis.magentaBright(`${command.data.name}`)), (ansis.green(`loaded`)));
                    console.log(`\u001b[0m`);
                }).catch(error => console.log(ansis.redBright(ansis.bold(`Error`)), (ansis.white(`>>`)), (ansis.yellow(ansis.bold(`${error}`)))));
            } catch (error) {
                console.error(`Failed to load command ${command.data.name}: ${error}`);
            }
            console.log(`Data: ${JSON.stringify(command.data)}`);
        } 
    });

    const rest = new REST({ version: '9' }).setToken(process.env.DISCORD_TOKEN);
}
