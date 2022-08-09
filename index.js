const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { guildId,token } = require('./config.json');
var S = require('string');
const bitfieldCalculator = require('discord-bitfield-calculator')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });


client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));


for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', async () => {console.log('Ready!')});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	//making sure it is a command
	if (!command) return;

	//constructing array of permissions from the returned bitfield
	const memberPermsBitfield = interaction.member.permissions['bitfield'];
	//making sure it is the number variable and not BigInt
	const memberPermsBitfieldNum = Number(memberPermsBitfield);
	//returning array of permissions
	const myPerms = bitfieldCalculator.permissions(memberPermsBitfieldNum);
	if(!myPerms.includes('ADMINISTRATOR')){
		await interaction.reply({content: 'You need the Administrator permissions to use this bot'});
	}
	else{
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(error);
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

client.login(token);