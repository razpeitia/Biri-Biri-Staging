exports.reclamo = function (bot){
const snekfetch = require("snekfetch");
const Discord = require("discord.js");
const JsonFind = require('json-find');
const prefix = "n!";
var intocable;
var casado;
var racha;

bot.on('message', msg => {

	let messageA = msg.content.split(" ");
	let args = messageA.slice(1);
	if (msg.content.startsWith(prefix + "reclamo")){
		let id = encodeURI(args);
		let str = id;
		let res = str.replace(","," ");
		snekfetch.get(` ***************** `).then(r =>{
			let body = r.body;
			if (!res) return msg.channel.send("No puedo buscar si no ingresas algo <:pacman:420980551105642516>");
			let entry = body.find(post => post.waifu);
			if (entry === undefined){   
                msg.reply("Esa persona/waifu no esta en el servidor, intenta nuevamente!"); 
            }else{
				let find = JsonFind(entry);
				/* Validaciones de casado, intocable y racha */
				if (find.intocable === "1"){
					var intocable = "Si";
				}else if(find.intocable === "0"){
					var intocable = "No";
				}

				if (find.casado === "1"){
					var casado = "Si";
				}else if (find.casado === "0"){
					var casado = "No";
				}
				if(find.racha === "0"){
					var racha = "No estas en racha! <a:apepoCry:443975688152940565>"
				}else if (find.racha ==="1"){
					var racha = (`${find.racha} Semana <a:yey:443975690967318541>`);
				}else{
					var racha = (`${find.racha} Semanas <a:blobdance:432765514440245250>`);
				}
				/* Fin de validaciones */

				/* Inicio de validaciones de embeds*/

	            if(intocable === "Si" && casado === "No")
	            {
					const embed = new Discord.RichEmbed()
						.setTitle("Datos del Reclamo <a:tohru:443975693785759744>")
						.setDescription(` Nombre del/la Reclamador/a : ** ${find.reclamador} **`)
						.addField("Waifu/Husbando/Trapfu/3D <a:kannadance:419009629113286658>", `${find.waifu}`)
						.addField("Intocable <a:intocable:443975684604428312>", `${intocable}`,true)
						.addField("Fecha del ultimo reclamo <a:time_stop:443975698466603008>",`${find.fecha_reclamo}`,true)
						.addField("Procedencia <a:awow:443975693781565441> ",`${find.procedencia}`,true)
						.addField("Racha: ",`${racha}`)
						.setImage(`${find.img}`)
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	                    .setTimestamp();
	                msg.channel.send({embed});
	               }else if(intocable === "No" && casado === "Si")
	            	{
					const embed = new Discord.RichEmbed()
						.setTitle("Datos del Reclamo <a:tohru:443975693785759744>")
						.setDescription(` Nombre del/la Reclamador/a : ** ${find.reclamador} **`)
						.addField("Waifu/Husbando/Trapfu/3D <a:kannadance:419009629113286658> ", `${find.waifu}`)
						.addField("Casado <a:casado:443975698185453569> ",`${casado}`,true)
						.addField("Fecha del ultimo reclamo <a:time_stop:443975698466603008> ",`${find.fecha_reclamo}`,true)
						.addField("Procedencia <a:awow:443975693781565441> ",`${find.procedencia}`,true)
						.addField("Racha: ",`${racha}`)
						.setImage(`${find.img}`)
						.setColor(0xfffd00)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	                    .setTimestamp();
	                msg.channel.send({embed});
	               }else if(intocable === "Si" && casado === "Si")
	            	{
					const embed = new Discord.RichEmbed()
						.setTitle("Datos del Reclamo <a:tohru:443975693785759744>")
						.setDescription(` Nombre del/la Reclamador/a : ** ${find.reclamador} **`)
						.addField("Waifu/Husbando/Trapfu/3D <a:kannadance:419009629113286658> ", `${find.waifu}`)
						.addField("Casado <a:casado:443975698185453569> ",`${casado}`,true)
						.addField("Intocable <a:intocable:443975684604428312> ", `${intocable}`,true)
						.addField("Fecha del ultimo reclamo <a:time_stop:443975698466603008> ",`${find.fecha_reclamo}`,true)
						.addField("Procedencia <a:awow:443975693781565441> ",`${find.procedencia}`,true)
						.addField("Racha: ",`${racha}`)
						.setImage(`${find.img}`)
						.setColor(0x00fd00)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	                    .setTimestamp();
	                msg.channel.send({embed});
	               }else if(intocable === "No" && casado === "No")
	            	{
					const embed = new Discord.RichEmbed()
						.setTitle("Datos del Reclamo <a:tohru:443975693785759744>")
						.setDescription(` Nombre del/la Reclamador/a : ** ${find.reclamador} **`)
						.addField("Waifu/Husbando/Trapfu/3D <a:kannadance:419009629113286658> ", `${find.waifu}`)
						.addField("Fecha del ultimo reclamo <a:time_stop:443975698466603008> ",`${find.fecha_reclamo}`,true)
						.addField("Procedencia <a:awow:443975693781565441> ",`${find.procedencia}`,true)
						.addField("Racha: ",`${racha}`)
						.setImage(`${find.img}`)
						.setColor(0x000000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	                    .setTimestamp();
	                msg.channel.send({embed});
	               }
               }
			});
		}
	});
};