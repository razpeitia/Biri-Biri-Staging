exports.changelog = function (bot){

const prefix = "n!";
const Discord = require("discord.js");
	bot.on('message', msg => {
		if(msg.content.startsWith(prefix + "changelog")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Changelog de Biri Biri`, "Versión actual: 2.7 ~ ")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.addField("Versión 2.7", "Agregado comando Putear")
							.addField("Versión 2.6", "Agregado Panel de errores")
							.addField("Versión 2.5", "Agregado n!dev [Comando para enviar sugerencias]")
							.addField("Versión 2.4", "Agregado n!avatar entre otros bugfixing")
							.addField("Versión 2.3", "Cambio de Servidor / Agregado n!avatar")
							.addField("Versión 2.2", "Agregado n!dab")
							.addField("Versión 2.1", "Agregado más gifs de culear")
							.addField("Versión 2.0", "Agregado n!culear | n!culiar")
							.addField("Versión 1.9.9", "Agregado n!changelog")
							.addField("Versión 1.9.8", "Agregado comandos para deshabilitar/habilitar, este se usa con n!comando [comando] activar/desactivar")
							.addField("Versión 1.9.2", "Agregado n!flip [Moneda de cara/cruz] y n!roll [Lanzar un dado]")
							.addField("Versión 1.9", "Agregado soportes para CuteApi")
							.addField("Versión 1.8.7", "Agregamos más comandos NSFW")
							.addField("Versión 1.8.5", "Agregado control de NSFW")
							.addField("Versión 1.8", "Agregamos comando yuri NSFW [experimental]")
							.addField("Versión 1.7", "Mejorado como se muestra los mensajes de emociones")
							.addField("Versión 1.6", "Agregado emociones para interactuar con la raza")
							.addField("Versión 1.5", "Modificado como se muestra el reclamo")
							.addField("Versión 1.2", "Agregado n!reclamo")
							.addField("Versión 1.0", "Traspaso de anterior bot [Meme y reacciones]")
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		  	msg.channel.send({embed}).catch(console.error);
		}
	});
}

exports.getCommands = (clients) => {
	return []
}