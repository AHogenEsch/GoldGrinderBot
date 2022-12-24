// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('newkey')
		.setDescription('Creates new Key')
		.addUserOption(option =>
			option.setName('target')
			.setDescription('The user the key is for')
			.setRequired(true))
		.addStringOption(duration =>
			duration.setName('duration')
			.setDescription('How long the key should last')
			.setRequired(true))
		.addStringOption(newname =>
			newname.setName('newname')
			.setDescription('The new name of this ticket or channel')
			.setRequired(false)),
	async execute(interaction) {
		//change the channel name to 'newname' if requested
		if(interaction.options.getString("newname")){
			interaction.channel.setName(interaction.options.getString("newname"));
		}

		const duration = interaction.options.getString("duration");
		var suffix = String(duration).substring(String(duration).length-1);
		var time = parseInt(String(duration).substring(0, String(duration).length-1));
		if(suffix == 'y'){
			time *= 31536600000;
		}
		else if(suffix == 'm'){
			time *= 2592000000;
		}
		else if(suffix == 'w'){
			time *= 604800000;
		}
		else{
			time *= 86400000;
		}
		time += Date.now();

		//get all current api keys in list
		//call api to create a record of the api key, along with user and duration
		//return the user, key, and duration in message

		// START PRE 3.0 API CODE {
		// const target = interaction.options.getUser('target');

		// var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    	// var key = '';
    	// for ( var i = 0; i < 20; i++ ) {
        // 	key += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    	// }
    	// key = String(target.tag).substring(0, String(target.tag).length-5).toUpperCase() + key;
		//// let result = await fetch("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": airtable}, "api_key": "PlaceHolder123", "discord_id": target}).then(resp => resp.json())		//create randomly generated key that is not already in database
		//let result = await axios.post('http://164.92.65.15:5000/add_autogrinder', {api_key: key, expire_after: time, discord_id: target.id}, {headers:{"OofAuth": oofauth}}) //.then(resp => resp.json())
		//await interaction.reply(`Target User: <@${target.id}>\nDuration: ${duration}\nApiKey: ${key}`);
		// END PRE 3.0 API CODE }

		let result = await axios.post('http://164.92.65.15:5000/create_key', {timeout: time, discord_id: target.id, discord_name: target.tag}, {headers:{"token": auth}}) //.then(resp => resp.json())
		await interaction.reply(`Target User: <@${target.id}>\nDuration: ${duration}\nApiKey: ${result}`);

	},
};