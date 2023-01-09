// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');
// RANDOM

module.exports = {
	data: new SlashCommandBuilder()
		.setName('modkey')
		.setDescription('modifies a keys, hwid, timeout, or discord id')
		.addStringOption(apikey =>
			apikey.setName('apikey')
			.setDescription('The target ApiKey')
			.setRequired(true))
		.addStringOption(timeout =>
			timeout.setName('timeout')
			.setDescription('How long the key should last')
			.setRequired(false))
        .addStringOption(discord_id =>
            discord_id.setName('discord_id')
            .setDescription('The discord ID the key should be set to')
            .setRequired(false))
        .addStringOption(hwid =>
            hwid.setName('hwid')
            .setDescription('the HWID to set')
            .setRequired(false)),
	async execute(interaction) {
        if(interaction.member.permissions.has('ADMINISTRATOR')){
            const duration = interaction.options.getString("timeout");
		

            //call api to create a record of the api key, along with user and duration
            //return the user, key, and duration in message 
            
            const api_key = interaction.options.getUser('apikey');
            // START PRE 3.0 API CODE {
    
            // var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            // var key = '';
            // for ( var i = 0; i < 20; i++ ) {
            // 	key += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
            // }
            // key = String(target.tag).substring(0, String(target.tag).length-5).toUpperCase() + key;
            // // let result = await fetch("http://164.92.65.15:5000/add_autogrinder", {headers:{"OofAuth": airtable}, "api_key": "PlaceHolder123", "discord_id": target}).then(resp => resp.json())		//create randomly generated key that is not already in database
            // let result = await axios.post('http://164.92.65.15:5000/add_autogrinder', {api_key: key, expire_after: time, discord_id: target.id}, {headers:{"OofAuth": auth}}) //.then(resp => resp.json())
            // await interaction.reply(`Target User: <@${target.id}>\nDuration: ${duration}\nApiKey: ${key}`);
            // END PRE 3.0 API CODE }
    
            let key = await axios.post('http://164.92.65.15:5000/api/v1/admin/create_key', {timeout: time, discord_id: target.id, discord_name: target.tag}, {headers:{"token": auth}})
            .then(resp => resp.data?.key ) || 'Key Gen Error'
            await interaction.reply(`Target User: <@${target.id}>\nDuration: ${duration}\nApiKey: ${key}`);        
        }
        else{
            await interaction.reply('L no perms');

        }

	},
};