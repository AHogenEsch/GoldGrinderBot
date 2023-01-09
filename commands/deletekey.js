const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const { auth } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('deletekey')
		.setDescription('Deletes Keys')
		.addSubcommand(subcommand =>
            subcommand.setName('api_key')
            .setDescription('Deleting one key')
            .addStringOption(option => option.setName('key').setDescription('Key to be deleted').setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand.setName('user')
            .setDescription('Deletes all keys of a user')
            .addUserOption(option => option.setName('target').setDescription('Target who\s keys will be deleted').setRequired(true))),
	async execute(interaction) {
        if(interaction.member.permissions.has('ADMINISTRATOR')){
            if(interaction.options.getSubcommand() === "api_key"){
                const key = interaction.options.getString('key');
                if(key){
                    let result = await axios.post('http://164.92.65.15:5000/api/v1/admin/delete_key', {api_key: key}, {headers:{"token": auth}});
                    await interaction.reply(`${key} Deleted`);
                }
            }
    
            else if(interaction.options.getSubcommand() === "user"){
                const target = interaction.options.getUser('target');
                if(target){
                    var keys = [];
                    var delKeys = [];
                    var reply = "";
                    //getting all the keys for specified user
                    let result = await axios.get('http://164.92.65.15:5000/api/v1/admin/list_keys', {headers:{"token": auth}})
                    .then(resp => keys = resp.data); 
                        // return make_response([i for i in config.db_keys["active"].find({}, {"_id": False})], 200)
                        for(const key of keys){
                            if(key["discord_id"] == target.id){
                                delKeys.push(key['api_key']);
                            }
                        }
                    if(delKeys){
                        for(const key of delKeys){
                            let result = await axios.post('http://164.92.65.15:5000/api/v1/admin/delete_key', {api_key: key}, {headers:{"token": auth}});
                            reply += `\nKey: ${key} Deleted.`;
                        }
                    }
                    if(!reply){
                        reply = "No Keys Found";
                    }
                    await interaction.reply(reply);
                }
                else{
                    await interaction.reply('Enter a User')
                }
            }
            else{
                await interaction.reply('Wrong Format for deletekey');
            }        }
        else{
            await interaction.reply('L no perms');

        }
	},
};