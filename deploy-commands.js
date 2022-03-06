const fs = require('node:fs');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for(const file of commandFiles){
const command = require(`./commands/${file}`);
commands.push(command.data.toJSON());
}
//const commands = [
//	new SlashCommandBuilder().setName('help').setDescription('Shows available commands'),
//	new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
//	new SlashCommandBuilder().setName('user').setDescription('Lists api key and associated bots'),
//]
//	.map(command => command.toJSON());
//
//const rest = new REST({ version: '9' }).setToken(token);
//
//rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
//	.then(() => console.log('Successfully registered application commands.'))
//	.catch(console.error);