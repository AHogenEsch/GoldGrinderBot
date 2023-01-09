// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('onlinebots')
		.setDescription('Lists Online Bots for user')
		.addUserOption(option =>
			option.setName('target')
			.setDescription('leave **blank** to check YOUR bots')
			.setRequired(false)),
		async execute(interaction) {
			if((!interaction.member.permissions.has('ADMINISTRATOR')) && (interaction.options.getUser('target'))){
				await interaction.reply('L no perms');
			}
			else{
				//get id of user
				// search api for id
				// return keys and durations
				var target ='';
				if(interaction.options.getUser('target')){
					target = interaction.options.getUser('target');
				}
				else{
					target = interaction.member
				}
				var keys = [];
				var targetKeys = [];
				var reply = `Online bots for <@${target.id}>`;
				//getting all the keys for target
				let result = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
					.then(resp => keys = resp.data); 
					// return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
				for(const key of keys){
					if(key["discord_id"] == target.id){
						targetKeys.push(key["api_key"]);
					}
				}
				if(targetKeys){
					var bots = [];
					for(const key of targetKeys){
						var respData = '';
						let result = await axios.get('http://164.92.65.15:5000/api/v1/public/list_bots', {headers:{"api_key": key}})
						.then(resp => {
							console.log(resp.data)
							respData = resp.data});
						for(ign in respData){
							console.log(respData[ign])
							reply += `\n**${ign}**, Pres: \`${respData[ign]["prestige"]}\`, Level: \`${respData[ign]["level"]}\` Lobby:\`${respData[ign]["lobby"]}\``
						}
					}
					await interaction.reply(reply);
					
				}
				else{
					await interaction.reply(`<@${target.id}> has no online bots`);
				}
			}

	},
};