// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('listkeys')
		.setDescription('Lists Keys')
		.addUserOption(option =>
			option.setName('target')
			.setDescription('The user who\'s keys are listed')
			.setRequired(true)),
		async execute(interaction) {
			if(interaction.member.permissions.has('ADMINISTRATOR')){
				//get id of user
				// search api for id
				// return keys and durations
				const target = interaction.options.getUser('target');
				var keys = [];
				var reply = `Keys for <@${target.id}>:`;
				let result = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
					.then(resp => keys = resp.data); 
					// return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
				for(const key of keys){
					if(key["discord_id"] == target.id){
						reply += `\n->**Key**: \`${key["api_key"]}\`\n**Expires**: <t:${Math.round(key["expire_by"]/1000)}:R> **HWID**: ||${key["hwid"]}||`;
					}
				}
				await interaction.reply(reply);


				// // old api code
				// let result = await axios.post('http://164.92.65.15:5000/list_autogrinder', {discord_id: target.id}, {headers:{"OofAuth": oofauth}}).then(resp => {keys = resp.data}); //.then(response => response.data).then(data => response.json({message: 'Keys:', data})) //.then(resp => resp.json()) 
				// var keyListString = `Key(s) For: <@${target.id}>\n`;
				// for(const key of keys["keys"]){
				//     var expiresOn = parseInt(key["expire"]) - Date.now();
				//     expiresOn = Math.round(expiresOn / 86400000 * 100) / 100;
				//     keyListString += `Key: ${key["key"]} expires in ${expiresOn} days \n`;
				// };
				// await interaction.reply(keyListString);
				// // end old api code			}
			}
			else{
				await interaction.reply('L no perms');
	
			}
		
	},
};