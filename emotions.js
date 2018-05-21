exports.emotions = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require('nekos.life');
const neko = new client();
const color = 0xff0000;
const footer = ["© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png"];

bot.on("message", msg =>{
		let author = msg.author.username;
		let hasMention = msg.mentions.members.first() !== undefined;
		let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
		let cmd = msg.content.trim().split(" ")[0];
		
		let commands = [
			{
				"name": "pat",
			 	"mention": true, 
			 	"action": neko.getSFWPat,
			 	"title": `**${mention}** *recibiste un pat de* **${author}**`
			},
			{
				"name": "kiss",
				"mention": true,
				"action": neko.getSFWKiss,
				"title": `**${mention}** recibiste un beso de **${author}**`
			},
			{
				"name": "slap",
				"mention": true,
				"action": neko.getSFWSlap,
				"title": `**${mention}** recibiste un Slap de **${author}**`
			},
			{
				"name": "hug",
				"mention": true,
				"action": neko.getSFWHug,
				"title": `**${mention}** recibiste un Abrazo de **${author}**`
			},
			{
				"name": "poke",
				"mention": true,
				"action": neko.getSFWPoke,
				"title": `**${mention}** recibiste un Poke de **${author}**`
			},
			{
				"name": "feed",
				"mention": true,
				"action": neko.getSFWFeed,
				"title": `**${mention}** te está alimentando **${author}**`
			},
			{
				"name": "meaw",
				"mention": false,
				"action": neko.getSFWNeko
			},
			{
				"name": "cuddle",
				"mention": true,
				"action": neko.getSFWCuddle,
				"title": `**${mention}** recibiste un Abrazo de **${author}**`
			},
			{
				"name": "tickle",
				"mention": false,
				"action": neko.getSFWTickle
			},
			{
				"name": "lizzard",
				"mention": false,
				"action": neko.getSFWLizard
			},
			{
				"name": "foxgirl",
				"mention": false,
				"action": neko.getSFWFoxGirl
			},
			{
				"name": "patas",
				"mention": false,
				"action": neko.getSFWEroFeet
			},
			{
				"name": "nekogif",
				"mention": false,
				"action": neko.getSFWNekogif
			},
			{
				"name": "kemono",
				"mention": false,
				"action": neko.getSFWKemonomimi
			},
			{
				"name": "holo",
				"mention": false,
				"action": neko.getSFWHolo
			}
		];
		for (var i = commands.length - 1; i >= 0; i--) {
			let command = commands[i];
			let fullCommandName = prefix + command.name;
			let isValidMention = (hasMention && command.mention) || !command.mention;
			
			if(cmd === fullCommandName) {
				if (isValidMention) {
					(async () => {
						let imgUrl = (await command.action()).url;
						const embed = new Discord.RichEmbed()
												 .setTitle(command.title || "")
												 .setColor(color)
												 .setImage(imgUrl)
												 .setFooter(...footer)
		    	  		msg.channel.send({embed});
					})();
				}
				else {
					(async () => {
		    	  		msg.channel.send(`\`${fullCommandName}\` necesita una mencion`);
					})();
				}
				
			}
			
		}
	});
}