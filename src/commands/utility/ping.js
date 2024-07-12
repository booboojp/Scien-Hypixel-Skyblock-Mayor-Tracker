const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');
require('dotenv').config();
module.exports = {
    data: new SlashCommandBuilder()
        .setName('skyblockdata')
        .setDescription('Fetches election data from the Hypixel Skyblock API'),

    async execute(interaction) {
        try {
            const apiKey = process.env.API_KEY;
            const uuid = process.env.MINECRAFT_UUID;

            const response = await axios.get(`https://api.hypixel.net/v2/resources/skyblock/election?key=${apiKey}&uuid=${uuid}`);

            if (response.status !== 200) {
				throw new Error(`API request failed with status ${response.status}`);
			}
	
			const data = response.data;
			const electionData = data.mayor.election ? data.mayor.election : {};
	
			let candidatesList = '';
			console.log(electionData.candidates);
			if (electionData.candidates && electionData.candidates.length > 0) {
				electionData.candidates.sort((a, b) => b.votes - a.votes);
				candidatesList = electionData.candidates.map(candidate => `- **${candidate.name}** (${candidate.votes}):`).join('\n');
			} else {
				candidatesList = "No candidates found in the election data.";	
			}
	
			const mayorPerks = data.mayor && data.mayor.perks ? data.mayor.perks.map(perk => `- **${perk.name}**: ${perk.description}`).join('\n') : '';
			const replyMessage = `Election Year (${data.mayor.election.year}) Data:\n\nMayor: **${data.mayor.name || 'Unknown'}**\nPerks:\n${mayorPerks}\nCandidates:\n${candidatesList}`;
	
			await interaction.reply(replyMessage);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to fetch data. Please check the API key and UUID.', ephemeral: true });
        }
    },
};