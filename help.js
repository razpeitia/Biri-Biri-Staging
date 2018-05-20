exports.help = function(bot){
const prefix = "n!";
const Discord = require("discord.js");
	bot.on('message', msg => {
		if(msg.content.startsWith(prefix + "help")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la lista de comandos!`, "* Hay bastantes! ~ *")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.setDescription(`*Para ver en profundidad un comando pon n!h<comando>*`)
							.addBlankField()
							.addField("Para ver los comandos NSFW pon", "► **n!hmeme**")
							.addBlankField()
							.addField("Para ver los comandos NSFW pon", "► **n!hreclamo**")
							.addBlankField()
							.addField("Para ver los comandos NSFW pon", "► **n!hnsfw**")
							.addBlankField()
							.addField("Para ver los comandos de Emociones pon", "► **n!hreacciones**")
							.addBlankField()
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed}).catch(console.error);
		}
		if(msg.content.startsWith(prefix + "hreclamo")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la informacion del comando`, " ► **n!reclamo [Nombre de la waifu/husbando reclamada/o]**")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.addField(`-Para que la busqueda se lleve a cabo, hay que ser muy consiso con la informacion que se proporciona, debe ser exactamente igual a como fue el nombre en el reclamo.`, `*Ej: Si yo reclame a Aihara Mei, en el comando debo utilizar Aihara Mei. No debo buscar Aihara/Mei/Mei Aihara (Puede que funcione de igual manera, pero posiblemente nos de un resultado que no queremos!)*`)
							.addBlankField()
							.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
							.setImage("https://i.imgur.com/mcSYRRV.png")
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed}).catch(console.error);
		}
		if(msg.content.startsWith(prefix + "hmeme")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la informacion del comando`, " ► **n!meme**")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.addField(`El uso es: \n- n!meme @nombredelapersona texto | texto`, `*Si queremos que sea en blanco, seria n!meme @nombre  |  o si que sea solo en un lado @nombre | texto ó texto | _*`)
							.addBlankField()
							.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
							.setImage("https://i.imgur.com/412UCBj.png")
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed}).catch(console.error);
		}
		if(msg.content.startsWith(prefix + "hnsfw")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la informacion del comando <:marrano:404021624828854272>`, " ► **n!nsfw**")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.addField(`Las posibilidades del NSFW son:`, `**► n!yuri**`)
							.addField(`► n!random`,`**► n!pussy**`)
							.addField(`► n!nsfwneko`,`**► n!nsfwnekoimg**`)
							.addField(`► n!cum`,`**► n!vanilla**`)
							.addField(`► n!tetas`,`**► n!mamada**`)
							.addField(`► n!anal`,`**► n!kuni**`)
							.addBlankField()
							.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
							.setImage("https://i.imgur.com/7u4JtqB.png")
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed}).catch(console.error);
		}
		if(msg.content.startsWith(prefix + "hreacciones")){
			const embed = new Discord.RichEmbed()
							.setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
							.addField(`Aqui esta la informacion de las reacciones`, "** Son varias!**")
							.setThumbnail("https://cdn.discordapp.com/avatars/429093104474128394/916faa4c27db28be1d3a5171398ca4d0.png")
							.addField(`Las reacciones son: `, `**► n!pat**`)
							.addField(`► n!kiss`,`**► n!slap**`)
							.addField(`► n!hug`,`**► n!poke**`)
							.addField(`► n!feed`,`**► n!meaw**`)
							.addField(`► n!cuddle`,`*Más proximamente ~*`)
							.addBlankField()
							.addField(`Ejemplo de un comando bien ejecutado`,`Imagen:`)
							.setImage("https://i.imgur.com/xddWYfi.png")
							.setColor(0xff0000)
							.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
		    			msg.channel.send({embed}).catch(console.error);
		}
	});
}