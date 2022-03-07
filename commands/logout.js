const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('logout')
		.setDescription('Stops discord bot'),
	async execute(interaction) {
		await interaction.reply('I am Disconnecting....');
		//crashes to reset my terminal 
		client.logout();
	},
};