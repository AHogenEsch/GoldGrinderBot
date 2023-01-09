const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('Lists commands'),
	async execute(interaction) {
		await interaction.reply(`List of Availible commands:
		/sendcommand {list of bots} {command} {apikey}
			{list of bots} = Igns of your bots, either 1 or servel, separated by a space
			{command} = the command being passed. check <#1005256187857600634> for a full breakdown
			to make it send any command, do \`say /{your command}\`
			Example, to do /lobby, send this '/sendcommand GoldenWindHog, say /lobby, {apikey}
		/onlinebots
			shows your online bots
			administrators can do /onlinebots {user} to see that user's online bots
		`
		)
	},
};