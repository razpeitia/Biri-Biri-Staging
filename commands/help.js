const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')

exports.getCommands = (clients) => {
	return [
		new CustomCommand({
			'name': 'help',
			'execute': (msg) => {
							const reply = new message.BaseMessage()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la lista de comandos!`, "* Hay bastantes! ~ *")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.setDescription(`*Para ver en profundidad un comando pon n!help <comando>*`)
							.addBlankField()
							.addField("Para ver como usar el comando de memes pon", "► **n!help meme**")
							.addBlankField()
							.addField("Para ver como usar el reclamo pon", "► **n!help reclamo**")
							.addBlankField()
							.addField("Para ver los comandos NSFW pon", "► **n!help nsfw**")
							.addBlankField()
							.addField("Para ver los comandos de Emociones pon", "► **n!help reacciones**")
							.addBlankField()
							.addField("Para ver los comandos de Emociones con CuteApi pon", "► **n!hc**")
							.addBlankField()
							.addField("Para ver los cambios de la Version pon", "► **n!changelog**")
		    			msg.channel.send(reply).catch(console.error)
			}
		}),
		new CustomCommand({
			'name': 'hreclamo',
			'execute': (msg) => {
				let reply = new message.BaseMessage()
				reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				reply.addField(`Aqui esta la informacion del comando`, " ► **n!reclamo [Nombre de la waifu/husbando reclamada/o]**")
				reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
				reply.addField(`-Para que la busqueda se lleve a cabo, hay que ser muy consiso con la informacion que se proporciona, debe ser exactamente igual a como fue el nombre en el reclamo.`, `*Ej: Si yo reclame a Aihara Mei, en el comando debo utilizar Aihara Mei. No debo buscar Aihara/Mei/Mei Aihara (Puede que funcione de igual manera, pero posiblemente nos de un resultado que no queremos!)*`)
				reply.addBlankField()
				reply.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
				reply.setImage("https://i.imgur.com/mcSYRRV.png")
  			msg.channel.send(reply).catch(console.error);
			}
		}),
		new CustomCommand({
			'name': 'hmeme',
			'execute': (msg) => {
				let reply = new message.BaseMessage()
				reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				reply.addField(`Aqui esta la informacion del comando`, " ► **n!meme**")
				reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
				reply.addField(`El uso es: \n- n!meme @nombredelapersona texto | texto`, `*Si queremos que sea en blanco, seria n!meme @nombre  |  o si que sea solo en un lado @nombre | texto ó texto | _*`)
				reply.addBlankField()
				reply.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
				reply.setImage("https://i.imgur.com/412UCBj.png")
  			msg.channel.send(reply).catch(console.error)
			}
		}),
		new CustomCommand({
			'name': 'hnsfw',
			'execute': (msg) => {
				let reply = new message.BaseMessage()
				reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				reply.setTitle(`Aqui esta la informacion del comando <:marrano:404021624828854272>`)
				reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
				reply.setDescription(`Las posibilidades del NSFW son:`)
				reply.addBlankField()
				let commands = clients.dispatcher.commands

				var fields = []
				for (let key of Object.keys(commands)) {
					let command = commands[key]
					if(fields.length === 2) {
						fields.push(true)
						reply.addField(...fields)
						fields = []
					}
					if(command.nsfw === true) {
						if(fields.length === 0)
							fields.push(`► ${command.getFullName()}`)
						else
							fields.push(`► ${command.getFullName()}`)
					}
				}

				if(fields.length === 1) fields.push('.')
				if(fields.length === 2) {
					fields.push(true)
					reply.addField(...fields)
				}

				reply.addBlankField()
				reply.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
				reply.setImage("https://i.imgur.com/7u4JtqB.png")
  			msg.channel.send(reply).catch(console.error)
			}
		}),
		new CustomCommand({
			'name': 'hreacciones',
			'execute': (msg) => {
				let reply = new message.BaseMessage()
				reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				reply.addField(`Aqui esta la informacion de las reacciones`, "** Son varias!**")
				reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
				reply.addField(`Las reacciones son: `, `**► n!pat**`)
				reply.addField(`► n!kiss`,`**► n!slap**`)
				reply.addField(`► n!hug`,`**► n!poke**`)
				reply.addField(`► n!feed`,`**► n!meaw**`)
				reply.addField(`► n!cuddle`,`**► n!tickle**`)
				reply.addField(`► n!lizzard`,`**► n!foxgirl**`)
				reply.addField(`► n!nekogif`,`**► n!kemono**`)
				reply.addField(`► n!holo`,`* Más proximamente ~ *`)
				reply.addBlankField()
				reply.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
				reply.setImage("https://i.imgur.com/xddWYfi.png")
		    msg.channel.send(reply).catch(console.error)
			}
		}),
		new CustomCommand({
			'name': 'hc',
			'execute': (msg) => {
				let reply = new message.BaseMessage()
				reply.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
				reply.addField(`Aqui esta la informacion de las reacciones con CuteApi`, `*Son diferentes a las de hreacciones*`)
				reply.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
				reply.addField(`Las reacciones son: `, `**► n!c cry**`)
				reply.addField(`► n!c pinch`,`**► n!c poke**`)
				reply.addField(`► n!c highfive`,`**► n!c nani**`)
				reply.addField(`► n!c punch`,`**► n!c hug**`)
				reply.addField(`► n!c nom`,`**► n!c woop**`)
				reply.addField(`► n!c cuddle`,`**► n!c tickle**`)
				reply.addField(`► n!c smug`,`**► n!c slap**`)
				reply.addField(`► n!c sleep`,`**► n!c pat**`)
				reply.addField(`► n!c pat`,`**► n!c lick**`)
				reply.addField(`► n!c kiss`,`**► n!c neko**`)
				reply.addField(`► n!c dancing`,`**► n!c triggered**`)
				reply.addField(`► n!c meme`,`**► n!c loli**`)
				reply.addBlankField()
				reply.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
				reply.setImage("https://i.imgur.com/k5envuU.png")
				reply.setColor(0xff0000)
				reply.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
  			msg.channel.send(reply).catch(console.error);
			}
        }),
	]
}
