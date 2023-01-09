// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtime')
		.setDescription('Adds time to an apikey')
		.addStringOption(duration =>
            duration.setName("duration")
            .setDescription("The amount of time in d, w, m, or y")
            .setRequired(true))
		.addStringOption(apikey =>
			apikey.setName('apikey')
			.setDescription('The Api Key to add time to')
			.setRequired(false))
		.addUserOption(target =>
			target.setName('target')
			.setDescription("The target who's key you want to add time to")
			.setRequired(false)),
		async execute(interaction) {
			if(interaction.member.permissions.has('ADMINISTRATOR')){
				//convert the duration into ms
				const duration = interaction.options.getString("duration");
				var suffix = String(duration).substring(String(duration).length-1);
				var time = parseInt(String(duration).substring(0, String(duration).length-1));
				var set = false; //if no suffix is passed, then the duration is a 'set timeout' value
				if(suffix == 'y'){
					time *= 315366000000;
				}
				else if(suffix == 'm'){
					time *= 25920000000;
				}
				else if(suffix == 'w'){
					time *= 6048000000;
				}
				else if(suffix == 'd'){
					time *= 864000000;
				}
				else{
					set = true
					time *= 10;
				}
		
				var reply = ''
				if(interaction.options.getString("apikey")){
					const apikey = interaction.options.getString("apikey")
					var reply = `Added ${duration} to \`${apiKey}\` :\n`;
					if(set){
						let resultMod = await axios.post('http://164.92.65.15:5000/api/v1/admin/modify_key', {"api_key": apiKey, "timeout": time}, {headers:{"token": auth}})
						.catch(err => reply += '***Something went wrong***\n')
					}
					else{
					let resultMod = await axios.post('http://164.92.65.15:5000/api/v1/admin/modify_key', {"api_key": apiKey, "add_timeout": time}, {headers:{"token": auth}})
					.catch(err => reply += '***Something went wrong***\n')
					}
				}
				else if(interaction.options.getUser('target')){
					//getting api keys for target
					const target = interaction.options.getUser("target")
					var keys = [];
					var targetKeys = [];
					let resultList = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
						.then(resp => keys = resp.data)
						.catch(err => reply += '***Something went wrong***\n'); 
						// return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
					for(const key of keys){
						if(key["discord_id"] == target.id){
							reply += `Key: \`${key["api_key"]}\` Expires: <t:${Math.round(key["expire_by"]/1000)}:R>\n`;
							targetKeys.push(key)
						}
					}
					//checking to make sure theres only one key
					if(targetKeys.length > 1){
						reply += "User has more than one API KEY, please specify"
					}
					else{
						const apiKey = targetKeys[0]["api_key"];
						var reply = `Added ${duration} to \`${apiKey}\` :\n`;
						if(set){
							let resultMod = await axios.post('http://164.92.65.15:5000/api/v1/admin/modify_key', {"api_key": apiKey, "timeout": time}, {headers:{"token": auth}})
							.catch(err => reply += '***Something went wrong***\n')
						}
						else{
						let resultMod = await axios.post('http://164.92.65.15:5000/api/v1/admin/modify_key', {"api_key": apiKey, "add_timeout": time}, {headers:{"token": auth}})
						.catch(err => reply += '***Something went wrong***\n')
						}
					}		
				}    
				await interaction.reply(reply)   
		
				// 2.0 API below:
		
				// //list keys and the new expire after amount in ms
				// const target = interaction.options.getUser('target');
				// var keys = [];
				// let result = await axios.post('http://164.92.65.15:5000/list_autogrinder', {discord_id: target.id}, {headers:{"OofAuth": auth}}).then(resp => {keys = resp.data}); //.then(response => response.data).then(data => response.json({message: 'Keys:', data})) //.then(resp => resp.json()) 
				// var keyListString = `Key(s) For: <@${target.id}>\n`;
				// for(const key of keys["keys"]){
				//     // var expiresOn = parseInt(key["expire"]) - Date.now();
				//     // expiresOn = Math.round(expiresOn / 86400000 * 100) / 100;
				//     // need to add api path to update the expire value for each key
				//     var newTime = parseInt(key["expire"]) + time;
				//     var newExpiresOn = newTime - Date.now();
				//     newExpiresOn = Math.round(newExpiresOn / 86400000 * 100) / 100;
				//     keyListString += `Key: ${key["key"]} will expire in ${newExpiresOn} days with\nnew Duration value: __${newTime}__\n`;
				// };
				// keyListString += "Please wait for <@846780568203952158> to verify this time addition";
				// await interaction.reply(keyListString);
			}
			else{
				await interaction.reply('L no perms');
	
			}
		
	},
};