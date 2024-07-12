const { Events, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const chalk = require('ansis');
module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {
        const channelID = process.env.CHANNEL_ID;
        const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
        const channel = guild.channels.cache.get(channelID);
        console.log(`${chalk.bold.black.bgMagentaBright('Scienti')}\n${chalk.bold('Status')}: Online\n${chalk.bold('ID')}: ${client.user.id}\n${chalk.bold('Discord Username')}: ${client.user.username}\n${chalk.bold('Avatar URL')}: ${client.user.avatarURL()}\n${chalk.bold('Presence')}: ${client.user.presence.status}\n${chalk.bold('Activity')}: ${JSON.stringify(client.user.presence.activities)}`);
		const sendDailyMessage = async () => {
            try {
                const response = await axios.get(`https://api.hypixel.net/v2/resources/skyblock/election?key=${process.env.API_KEY}&uuid=${process.env.MINECRAFT_UUID}`);
    
                if (response.status !== 200) {
                    throw new Error(`API request failed with status ${response.status}`);
                }
    
                const data = response.data;
                const electionData = data.mayor.election ? data.mayor.election : {};
    
                let candidatesList = '';
                if (electionData.candidates && electionData.candidates.length > 0) {
                    electionData.candidates.sort((a, b) => b.votes - a.votes);
    
                    candidatesList = electionData.candidates.map(candidate => `- **${candidate.name}** (${candidate.votes}):`).join('\n');
                } else {
                    candidatesList = "No candidates found in the election data.";	
                }
    
                const mayorPerks = data.mayor && data.mayor.perks ? data.mayor.perks.map(perk => `- **${perk.name}**: ${perk.description}`).join('\n') : '';
    
                const embed = new EmbedBuilder()
                    .setTitle(`Election Year (${data.mayor.election.year}) Data:`)
                    .setDescription(`Mayor: **${data.mayor.name || 'Unknown'}**`)
                    .addFields(
                        { name: 'Perks', value: mayorPerks },
                        { name: 'Candidates', value: candidatesList }
                    )
                    .setColor('#0099ff');
        
                if (!channel) {
                    console.log('Channel not found or something fucked up, You wont remember the code booboo go just check the source.');
                    return;
                }
    
                channel.send({ content: `<@${process.env.USER_ID_TO_PING}>`, embeds: [embed] });
    
            } catch (error) {
                console.error(error);
            }
        }
        setInterval(sendDailyMessage, 10000); // 172800000 = 2 Days, 30000 = 30 Seconds or 3 Seconds
	},
};
