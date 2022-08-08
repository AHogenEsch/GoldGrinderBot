const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('info')
		.setDescription('Lists important channels'),
	async execute(interaction) {
		await interaction.reply(`<#983071673546838046> - You will find the mod download here\n<#890041334390485002> -  ***READ THROUGH THIS*** it will answer 99% of your questions, and includes an instructional video\n<#890081324101173249> - Heresy Buyback policy & general terms you must adhere to\n<#1005256187857600634> - details about the mod commands and settings\n<#995883112775045241> - Method on how to get free bot accounts\nping <@&944732344831602778> for further questions`);
	},
};