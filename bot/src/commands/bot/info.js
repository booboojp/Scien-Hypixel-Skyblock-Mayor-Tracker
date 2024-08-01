const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    try {
        // Your command logic here
        console.log('Executing command...');
    } catch (error) {
        if (error.message.includes('RATE_LIMIT')) {
            console.log('Rate limit exceeded. Retrying after 1 second.');
            setTimeout(() => {
                module.exports(client, interaction, args);
            }, 1000);
        } else {
            console.error(`Command Loading Error: ${error}`);
        }
    }
};
