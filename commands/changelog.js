const message = require('../core/message.js')
const CustomCommand = require('../core/command.js').CustomCommand

exports.getCommands = (clients) => {
	return [new CustomCommand({
		'name': 'changelog',
		'execute': (msg) => {
			let reply = new message.BaseMessage(msg)
			reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
			reply.addField(`Changelog de Biri Biri`, "Versión actual: 3.1 ~ ")
			reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
			reply.addField("Versión 2.7", "Agregado comando Putear")
			reply.addField("Versión 2.6", "Agregado Panel de errores")
			reply.addField("Versión 2.5", "Agregado n!dev [Comando para enviar sugerencias]")
			reply.addField("Versión 2.4", "Agregado n!avatar entre otros bugfixing")
			reply.addField("Versión 2.3", "Cambio de Servidor / Agregado n!avatar")
			reply.addField("Versión 2.2", "Agregado n!dab")
			reply.addField("Versión 2.1", "Agregado más gifs de culear")
			reply.addField("Versión 2.0", "Agregado n!culear | n!culiar")
			reply.addField("Versión 1.9.9", "Agregado n!changelog")
			reply.addField("Versión 1.9.8", "Agregado comandos para deshabilitar/habilitar, este se usa con n!comando [comando] activar/desactivar")
			reply.addField("Versión 1.9.2", "Agregado n!flip [Moneda de cara/cruz] y n!roll [Lanzar un dado]")
			reply.addField("Versión 1.9", "Agregado soportes para CuteApi")
			reply.addField("Versión 1.8.7", "Agregamos más comandos NSFW")
			reply.addField("Versión 1.8.5", "Agregado control de NSFW")
			reply.addField("Versión 1.8", "Agregamos comando yuri NSFW [experimental]")
			reply.addField("Versión 1.7", "Mejorado como se muestra los mensajes de emociones")
			reply.addField("Versión 1.6", "Agregado emociones para interactuar con la raza")
			reply.addField("Versión 1.5", "Modificado como se muestra el reclamo")
			reply.addField("Versión 1.2", "Agregado n!reclamo")
			reply.addField("Versión 1.0", "Traspaso de anterior bot [Meme y reacciones]")
		  msg.channel.send(reply).catch(console.error)
		}
	})]
}