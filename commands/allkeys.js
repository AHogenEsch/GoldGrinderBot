// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('allkeys')
		.setDescription('Lists All Keys, Or just online keys')
		.addBooleanOption(online =>
			online.setName('online')
			.setDescription('Return online bots')
			.setRequired(false)),
		async execute(interaction) {
			if(interaction.member.permissions.has('ADMINISTRATOR')){
				// BUILDING THIS TO ONLY ACCOUNT FOR SMALL DB OF KEYS, WILL HAVE TO CHANGE IF DB GROWS TOO LARGE
				var keys = [];
				var reply = "All Keys:";
			
				if(interaction.options.getBoolean('online')){
					reply = 'All Online bots:'
					let result = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_all', {headers:{"token": auth}})
					.then(resp => keys = resp.data); 
					console.log(keys)
					for(ign in keys){
						reply += `\n**${ign}**, Pres: \`${keys[ign]["prestige"]}\`, Level: \`${keys[ign]["level"]}\` Lobby:\`${keys[ign]["lobby"]}\``
					}
					
				}
				else{
					let result = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
					.then(resp => keys = resp.data); 
					// return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
					for(const key of keys){
						reply += `\n->**User**: <@${key["discord_id"]}> **HWID**: ||${key["hwid"]}||\n**Key**: \`${key["api_key"]}\`\n**Expires**: <t:${Math.round(key["expire_by"]/1000)}:R>`;
					}
				}
				await interaction.reply(reply);
			}
			else{
				await interaction.reply('L no perms');
	
			}
			

	},
};