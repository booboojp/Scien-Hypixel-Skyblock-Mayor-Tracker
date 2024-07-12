const { Events, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const chalk = require('ansis');
module.exports = {
	name: Events.ClientReady,
	once: false,
	execute(client) {
        console.log(`${chalk.bold.black.bgMagentaBright('Scienti')}\n${chalk.bold('Status')}: Online\n${chalk.bold('ID')}: ${client.user.id}\n${chalk.bold('Discord Username')}: ${client.user.username}\n${chalk.bold('Avatar URL')}: ${client.user.avatarURL()}\n${chalk.bold('Presence')}: ${client.user.presence.status}\n${chalk.bold('Activity')}: ${JSON.stringify(client.user.presence.activities)}`);
		const sendDailyMessage = async () => {
            const channelID = process.env.CHANNEL_ID;
            const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
            const channel = guild.channels.cache.get(channelID);
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
    

                function getRendersFromName(name) {
                    const images = {
                        'Aatrox': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/a/a5/Aatrox.png',
                        'Cole': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/b/b8/Cole.png',
                        'Diana': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/5/5f/Diana.png',    
                        'Diaz': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/d/da/Diaz.png',
                        'Finnegan': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/8/85/Finnegan.png',
                        'Foxy': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/9/90/Foxy.png',
                        'Marina': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/9/9d/Marina.png',
                        'Paul': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/0/00/Paul.png/',
                        'Derpy': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/d/de/Derpy.png/revision/latest?cb=20210802153205&format=original',
                        'Jerry': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/5/58/Villager.png',
                        'Scorpius': 'https://static.wikia.nocookie.net/hypixel-skyblock/images/a/af/Scorpius.png',
                    }
                    return images[name] || images['Unknown'];
                }

                const image = getRendersFromName(data.mayor.name)


                const embed = new EmbedBuilder()
                    .setTitle(`Election Year (${data.mayor.election.year}) Data:`)
                    .setDescription(`Mayor: **${data.mayor.name || 'Unknown'}**`)
                    .addFields(
                        { name: 'Perks', value: mayorPerks },
                        { name: 'Candidates', value: candidatesList }
                    )
                    .setThumbnail(image)
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
        const sendDailyNeko = async () => {
            const APITags = {
                "Illustration": 1,
                "Original Style": 25,
                "Boy": 52,
                "Horsegirl": 51,
                "Blonde hair": 50,
                "Skirt": 49,
                "Kissing": 48,
                "Threesome": 47,
                "Masturbating": 46,
                "Futanari": 45,
                "Anal": 44,
                "Glasses": 43,
                "Red hair": 42,
                "Yuri": 41,
                "Wet": 40,
                "Baggy Clothes": 39,
                "Guitar": 38,
                "School Uniform": 37,
                "Usagimimi": 36,
                "Dress": 35,
                "Bunny girl": 34,
                "Tree": 33,
                "Ice Cream": 32,
                "Bikini": 31,
                "Weapon": 30,
                "Shorts": 29,
                "Rain": 28,
                "Sunny": 27,
                "Brown hair": 26,
                "Gloves": 24,
                "Night": 23,
                "Mountain": 22,
                "Reading": 21,
                "Beach": 20,
                "Maid": 19,
                "Dick": 16,
                "Exposed anus": 15,
                "Exposed girl breasts": 13,
                "Pink hair": 12,
                "Blue Hair": 10,
                "Loli": 9,
                "White hair": 8,
                "Catgirl": 7,
                "Flowers": 5,
                "Sword": 4,
                "Sportswear": 2,
                "Girl": 1,
                "Pussy": 17,
                "Large breasts": 53,
                "Medium Breasts": 54,
                "Small Breasts": 55,
                "Flat Chest": 56,
                "Purple hair": 14,
                "Plants": 11,
                "Kemonomimi": 6,
                "Black hair": 3,
                "Furry": 57
            };
            const keys = Object.keys(APITags);
            const randomTag = keys[Math.floor(Math.random() * keys.length)];
            const randomTagID = APITags[randomTag];




            const channelID = process.env.SECONDARY_CHANNEL_ID;
            const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);
            


            const roleID = process.env.ROLE_ID_TO_PING;
            const role = guild.roles.cache.get(roleID);



            


            const channel = guild.channels.cache.get(channelID);
            try {
                const response = await axios.get('https://api.nekosapi.com/v3/images/random', { params: { limit: 1, tag: randomTagID } });
                const data = response.data.items[0].image_url;
                channel.send({ content: `Daily Waifu Upload - ${randomTag} | ${role}`, files: [{ attachment: data }] });
            } catch (error) {
                console.error(error);
            }
        }
        sendDailyNeko()
        setInterval(sendDailyMessage, 10000); // 172800000 = 2 Days, 30000 = 30 Seconds or 3 Seconds
	},
};



