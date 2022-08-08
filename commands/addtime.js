// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { oofauth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('addtime')
		.setDescription('returns the new expire after amount in ms')
		.addUserOption(target =>
			target.setName('target')
			.setDescription('The target to get more time')
			.setRequired(true))
        .addStringOption(duration =>
            duration.setName("duration")
            .setDescription("The amount of time in d, w, m, or y")
            .setRequired(true)),
		async execute(interaction) {
		//convert the duration into ms
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
        //list keys and the new expire after amount in ms
        const target = interaction.options.getUser('target');
        var keys = [];
		let result = await axios.post('http://164.92.65.15:5000/list_autogrinder', {discord_id: target.id}, {headers:{"OofAuth": oofauth}}).then(resp => {keys = resp.data}); //.then(response => response.data).then(data => response.json({message: 'Keys:', data})) //.then(resp => resp.json()) 
        var keyListString = `Key(s) For: <@${target.id}>\n`;
        for(const key of keys["keys"]){
            // var expiresOn = parseInt(key["expire"]) - Date.now();
            // expiresOn = Math.round(expiresOn / 86400000 * 100) / 100;
            // need to add api path to update the expire value for each key
            var newTime = parseInt(key["expire"]) + time;
            var newExpiresOn = newTime - Date.now();
            newExpiresOn = Math.round(newExpiresOn / 86400000 * 100) / 100;
            keyListString += `Key: ${key["key"]} will expire in ${newExpiresOn} days with\nnew Duration value: __${newTime}__\n`;
        };
        keyListString += "Please wait for <@846780568203952158> to verify this time addition";
        await interaction.reply(keyListString);
	},
};