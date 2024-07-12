const { Events } = require('discord.js');
const axios = require('axios');
const chalk = require('ansis');
module.exports = {
	name: Events.Debug,
	once: false,
	execute(client) {
		console.log(`${chalk.green("Debug Message")}: ${client}`);
	},
};
module.exports = {
	name: Events.Warning,
	once: false,
	execute(client) {
		console.log(`${chalk.yellowBright("Warning Message")}: ${client}`);
	},
};
module.exports = {
	name: Events.Error,
	once: false,
	execute(client) {
		console.log(`${chalk.redBright("Error Message")}: ${client}`);
	},
};
