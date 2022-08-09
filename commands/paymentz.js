const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('payments')
		.setDescription('Sends the acceptable payment methods in the order they are preferred'),
	async execute(interaction) {
		await interaction.reply(`Payment methods in the order I prefer recieving them:\nPayPal: [@goldenwind0001](https://www.paypal.com/paypalme/goldenwind0001) FRIENDS AND FAMILY ONLY\nBTC: __3MjPYJrFWt6xuVgCzyn6C71tiWfBJK1ZDv__\nETH: __0x4bBA1d9d2aC1FD006CD86B0348c10D54d8ab38c9__\nLTC: __MDxCYzmAHyCgNugi7eVEtgJHjPC7ZUHQR9__\nSOL: __FKzcnZd6XzEynkiAKKQa16c8P5N8EmAGSuhPFZDBV2EC__`);
	},
};