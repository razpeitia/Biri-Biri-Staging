exports.emotions = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require('nekos.life');
const neko = new client();
bot.on("message", msg =>{
		if(msg.content.startsWith(prefix + "pat")){
			async function pat() {
			  let obj = await neko.getSFWPat();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** *recibiste un pat de* **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			pat();	
		}
		if(msg.content.startsWith(prefix + "kiss")){
			async function kiss() {
			  let obj = await neko.getSFWKiss();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** recibiste un beso de **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			kiss();	
		}		
		if(msg.content.startsWith(prefix + "slap")){
			async function slap() {
			  let obj = await neko.getSFWSlap();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** recibiste un Slap de **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			slap();	
		}
		if(msg.content.startsWith(prefix + "hug")){
			async function hug() {
			  let obj = await neko.getSFWHug();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** recibiste un Abrazo de **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			hug();	
		}				
		if(msg.content.startsWith(prefix + "poke")){
			async function poke() {
			  let obj = await neko.getSFWPoke();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** recibiste un Poke de **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			poke();	
		}
		if(msg.content.startsWith(prefix + "feed")){
			async function feed() {
			  let obj = await neko.getSFWFeed();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** te está alimentando **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			feed();	
		}
		if(msg.content.startsWith(prefix + "meaw")){
			async function meaw() {
			  let obj = await neko.getSFWNeko();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();
			  const embed = new Discord.RichEmbed()
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			meaw();	
		}
		if(msg.content.startsWith(prefix + "cuddle")){
			async function cuddle() {
			  let obj = await neko.getSFWCuddle();
			  let message = msg.content.split(" ");
			  let persona = message[1];
			  let dequien = msg.mentions.users.first();
			  var usermentioned = msg.mentions.members.first();	
			  const embed = new Discord.RichEmbed()
			  			.setTitle(`**${usermentioned.user.username}** recibiste un Abrazo de **${msg.author.username}**`)
						.setColor(0xff0000)
						.setImage(`${obj.url}`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	  msg.channel.send({embed});
			}
			cuddle();	
		}		
	});
}