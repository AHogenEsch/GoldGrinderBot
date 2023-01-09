const { SlashCommandBuilder } = require('@discordjs/builders');
const {cacPrice, pbsPrice, fedPrice, vilPrice, gemPrice, jwlPrice} = require('../../prices.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('purecalc')
		.setDescription('Calculates price of pure using cac, pbs, fed, vil, gem, jwl')
		.addStringOption(order =>
			order.setName('order')
			.setDescription('Pure order')
			.setRequired(true)),
	async execute(interaction) {
		// var cac;
		// var pbs;
		// var fed;
		// var vil;
		// var gem;
		// var jwl;
		var purePrices = [cacPrice, pbsPrice, fedPrice, vilPrice, gemPrice, jwlPrice];
		var pureCount = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

		const order = interaction.options.getString('order');

		var orders = order.split(" ");
		for(const ord of orders){
			var type = ord.substring(ord.length-3);
			var count = parseFloat(ord.substring(0, ord.length-3));
			if(type == 'cac'){
				pureCount[0] += count;
			}
			else if(type == 'pbs'){
				pureCount[1] += count;
			}
			else if(type == 'fed'){
				pureCount[2] += count;
			}
			else if(type == 'vil'){
				pureCount[3] += count;
			}
			else if(type == 'gem'){
				pureCount[4] += count;
			}
			else if(type == 'jwl'){
				pureCount[5] += count;
			}
		}

		var pureEmojis = [`stacks of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PhiloCac')}`, `of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'PB')}`, `of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Fedur')}`, `stacks of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'vile')}`, `of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'Gem')}`, `of ${interaction.guild.emojis.cache.find(emoji => emoji.name === 'JewelSword')}`];
		var sum = 0;
		var response = '';

		for(var i = 0; i < 6; i++ ){
			if(pureCount[i] > 0){
				var subTotal = pureCount[i] * purePrices[i];
				sum += subTotal;
				response += `\`${pureCount[i]}\` ${pureEmojis[i]} at a price of __**${purePrices[i]}**__ per = \`$${subTotal}\`\n`;
			}
		}
		if(response == ''){
			response += 'Please use the suffixes cac, pbs, fed, vil, gem, jwl\nExample: /purecalc 10pbs 1vil 4jwl';
		}else{
			response += `Your total is \`$${sum}\``;
		}
		
		await interaction.reply(response);
	},
};