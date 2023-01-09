const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('account')
		.setDescription('Formats account details in a cool way')
        .addStringOption(ign =>
            ign.setName('ign')
            .setDescription('Ign of the account')
            .setRequired(true))
        .addStringOption(email =>
            email.setName('email')
            .setDescription('email of the account @outlook.com')
            .setRequired(true))
        .addStringOption(password =>
            password.setName('password')
            .setDescription('Password of the account')
            .setRequired(true))
        .addStringOption(security =>
            security.setName('security')
            .setDescription('Security email of the account @gmail.com')
            .setRequired(true)),
	async execute(interaction) {
		await interaction.reply(`Details for: **${interaction.options.getString("ign")}**\nMicrosoft Email: \`${interaction.options.getString("email")}@outlook.com\`\nPassword: ||${interaction.options.getString("password")}||\nSecurity Email: \`${interaction.options.getString("security")}@gmail.com\`\n see <#971178089910513764> for details on how to secure your account`);
    },
};