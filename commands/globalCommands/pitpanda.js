// const fetch =  import('node-fetch');
const { SlashCommandBuilder } = require('@discordjs/builders');
var MojangAPI = require('mojang-api');
const axios = require('axios');
// const { ApplicationCommandOptionTypes } = require('discord.js/typings/enums');
const { auth } = require('../../config.json');
const { hypixelApiKey } = require('../../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('pitpanda')
		.setDescription('Returns info about a player')
		.addStringOption(option =>
			option.setName('igns')
			.setDescription('the igns to lookup, case sensitive and separated by a single space')
			.setRequired(true)),
		async execute(interaction) {
            if(interaction.member.permissions.has('ADMINISTRATOR')){
                // parse igns
                // for each ign, get prestige, level, current gold, mysticism level, current renoun, and xp needed to prestige
                const igns = interaction.options.getString('igns');
                var ignArr = igns.split(" ");
                var replies = []
                for(const ign of ignArr){
                    var reply = '';
                    var date = new Date();
                    var uuid = '';
                    let mojangReq = await MojangAPI.uuidAt(ign, date, function(err, res) {
                    if (err)
                        console.log(err);
                    else
                        console.log("On " + date + `the uuid for ${ign} was ` + res.id);
                        uuid = res.id;
                        reply += `the UUID for ${ign} is ${uuid}`;
                        replies.push(reply);
                    }); 

                    // integer to Roman
                    //     romansDict = {1: "I", 5: "V", 10: "X", 50: "L", 100: "C", 500: "D", 1000: "M", 5000: "G", 10000: "H"}
                
                    // div = 1
                    // while A >= div:
                    //     div *= 10
                    // div /= 10
                    // res = ""
                    // while A:
                    //     lastNum = int(A / div)
                    //     if lastNum <= 3:
                    //         res += (romansDict[div] * lastNum)
                    //     elif lastNum == 4:
                    //         res += (romansDict[div] +
                    //                     romansDict[div * 5])
                    //     elif 5 <= lastNum <= 8:
                    //         res += (romansDict[div * 5] +
                    //         (romansDict[div] * (lastNum - 5)))
                    //     elif lastNum == 9:
                    //         res += (romansDict[div] +
                    //                     romansDict[div * 10])
                    //     A = floor(A % div)
                    //     div /= 10
                    // return res
                }
                console.log(replies)
                var firstRep = replies.pop();
                console.log(`first rep: ${firstRep}`)
                await interaction.reply(`${firstRep}`);
                if(replies.length > 0){
                    for(rep of replies){
                        await interaction.followUp(rep);
                    }
                }
            }
            else{
                await interaction.reply('L no perms');
    
            }
		

	},
};