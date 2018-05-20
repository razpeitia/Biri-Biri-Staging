exports.r34 = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require('nekos.life');
const neko = new client();
	bot.on("message", msg =>{
		if(msg.channel.id === "402670297402310657"){
			if(msg.content.startsWith(prefix + "yuri")){
				async function yuri() {
				  let obj = await neko.getNSFWLesbian();
				  const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				yuri();
			}
			if(msg.content.startsWith(prefix + "random")){
				async function random() {
				  let obj = await neko.getNSFWRandomHentaiGif();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				random();	
			}
			if(msg.content.startsWith(prefix + "pussy")){
				async function pussy() {
				  let obj = await neko.getNSFWPussy();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				pussy();	
			}
			if(msg.content.startsWith(prefix + "nsfwneko")){
				async function nsfwneko() {
				  let obj = await neko.getNSFWNekoGif();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				nsfwneko();
			}
			if(msg.content.startsWith(prefix + "nsfwnekoimg")){
				async function nsfwnekoimg() {
				  let obj = await neko.getNSFWNeko();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				nsfwnekoimg();
			}
			if(msg.content.startsWith(prefix + "kuni")){
				async function kuni() {
				  let obj = await neko.getNSFWKuni();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				kuni();
			}
			if(msg.content.startsWith(prefix + "cum")){
				async function cum() {
				  let obj = await neko.getNSFWCumsluts();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				cum();
			}
			if(msg.content.startsWith(prefix + "vanilla")){
				async function vanilla() {
				  let obj = await neko.getNSFWClassic();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				vanilla();
			}
			if(msg.content.startsWith(prefix + "tetas")){
				async function tetas() {
				  let obj = await neko.getNSFWBoobs();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				tetas();
			}
			if(msg.content.startsWith(prefix + "mamada")){
				async function mamada() {
				  let obj = await neko.getNSFWBj();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				mamada();
			}
			if(msg.content.startsWith(prefix + "anal")){
				async function anal() {
				  let obj = await neko.getNSFWAnal();
				   const embed = new Discord.RichEmbed()
							.setColor(0xff0000)
							.setImage(`${obj.url}`)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed});
				}
				anal();
			}										
		}		
	});
}