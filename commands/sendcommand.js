// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
    .setName('sendcommand')
    .setDescription('Sends command to one or a few bots')
    .addStringOption(ign => ign.setName('igns').setDescription('Your Bot igns with Capitalization and a single space inbetween each').setRequired(true))
    .addStringOption(command => command.setName('command').setDescription('The command to send').setRequired(true))
    // in future make it so that apikey is optional
    .addStringOption(apikey => apikey.setName('apikey').setDescription('Your api key').setRequired(true)),
		async execute(interaction) {

            var userBots = interaction.options.getString('igns');
            var cmd = interaction.options.getString('command');
            var apiKey = interaction.options.getString('apikey');
            var authorized = false;
            if(interaction.member.permissions.has('ADMINISTRATOR')){
                authorized = true;
            }
            var bts = userBots.split(" ");
            var success = false;
            var reply = `\`${cmd}\` sent to: `;
            console.log(`cmd: ${cmd}, bts: ${bts}, apiKey: ${apiKey}`)

            var keys = [];
            let resultKeyCheck = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
                .then(resp => keys = resp.data); 
                // return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
            for(const key of keys){
                if(key["api_key"] == apiKey && key["discord_id"] == interaction.member.id){
                    authorized = true;
                }
            }
            if(authorized){
                let result = await axios.post('http://164.92.65.15:5000/api/v1/public/command', {bots: bts, command: cmd}, {headers:{"api_key": apiKey}})
                .then(resp => success = resp.data["success"])
                if(success){
                    for(const bot of bts){
                        reply += `**${bot}**, `
                    }

                    await interaction.reply(reply.substring(0, reply.length-2));
                }
                else{
                    await interaction.reply('Commands failed to send, check your api key');
                }

            }
            else{
                await interaction.reply('Use **YOUR** APIKEY bozo')
            }

            
            

	},
};