exports.emotions = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require("nekos.life");
const cute = require("cuteapi");
const config = require("./config_commands.json");
var Cooldown = require('cooldown');
let img = new Cooldown(50000);
let text = new Cooldown(50000);

const neko = new client();
const cuteapi = new cute('04a3611ef7da5a03656bc5f3d28803418b95a8d6bfb0a92761e57ab368679530ea12903dbb13721fd111367cf82df5dc6f43ad539bc35a0504f1b387e9506e03');

function famfamoMsg(title, imgUrl) {
	const color = 0xff0000;
	const footer = ["© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png"];
	return new Discord.RichEmbed()
										.setTitle(title)
										.setColor(color)
										.setImage(imgUrl)
										.setFooter(...footer);
}

bot.on("message", msg => {
		let isNSWFChannel = msg.channel.nsfw;
		let author = msg.author.username;
		let hasMention = msg.mentions.members.first() !== undefined;
		let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
		let cmd = msg.content.trim().split(" ")[0];

		let commands = [
			{
				"name": "comando",
				"init": (msg) => {
					let isAdmin = config.admins.some(uid => { return uid === msg.author.id; });
					let maybeCommand = msg.content.trim().split(/\s+/)[1];
					let maybeAction = msg.content.trim().split(/\s+/)[2];
					let cmds = config.commands.filter(c => { return c.name === maybeCommand; });
					return {
									"command": maybeCommand,
									"commands": cmds,
									"hasCommands": cmds.length > 0,
									"action": maybeAction,
									"isAdmin": isAdmin
								};
				},
				"title": (state) => {
					if(!state.isAdmin) {
						return `Necesitas ser un admin, pendejo`;
					}
					if(state.command === undefined) {
						return "Necesitas especificar un comando, pendejo";
					}
					if(state.command === "comando") {
						return "No <:wanwan:403968696067948554>";
					}
					if(!state.hasCommands) {
						return `Comando \`${state.command}\` no encontrado`;
					}
					if(state.action !== "activar" && state.action !== "desactivar") {
						return `Necesitas especificar una action "activar" o "desactivar, pendejo"`;
					}
					let action = (state.action === "activar") ? "activado" : "desactivado";
					state.commands.forEach(c => { c.enable = (state.action === "activar"); });
					return `(${state.commands.length}) comando ${state.command} ${action}`;
				},
				"action": (state) => {
					return {"url": ""}
				}
			},
			{
				"name": "roll",
				"init": (msg) => {
					let maybeNumber = msg.content.trim().split(/\s+/)[1];
					let sides = /^\d{1,3}$/.test(maybeNumber) ? Number.parseInt(maybeNumber) : 6;
					let randomNumber = Math.floor(Math.random() * sides) + 1;
					return {"number": randomNumber, "sides": sides};
				},
				"title": (state) => {
					return `**${author}** te sacaste un ${state.number} de un dado de ${state.sides} caras`;
				},
				"action": (state) => {
					return {url: ""};
				}
			},
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
				"action": neko.getSFWNeko
			},
			{
				"name": "cuddle",
				"mention": true,
				"action": neko.getSFWCuddle,
				"title": `**${mention}** recibiste un Abrazo de **${author}**`
			},
			{
				"name": "flip",
				"init": (msg) => {
					return {"coin": Math.round(Math.random()) };
				},
				"title": (state) => {
					if(state.coin === 1) {
						if (text.fire()) {
						return `**${author}** te sacaste aguila`;
						}else{
						return `Debes esperar para poder tirar otra moneda!`; 
						}
					}else {
						if (text.fire()){
						return `**${author}** te sacaste sol`;
						}else{
						return `Debes esperar para poder tirar otra moneda!`; 
						}
					}
				},
				"action": (state) => {
					if (img.fire()) {
					let aguilaUrl = "https://i.imgur.com/VpcIiTD.gif";
					let solUrl = "https://i.imgur.com/3ECJb4T.gif";
					return {"url": state.coin === 1 ? aguilaUrl : solUrl}
					}else{
						return {"url": "https://i.imgur.com/VbCqD59.png"}
					}
				}
			},
			{
				"name": "tickle",
				"action": neko.getSFWTickle
			},
			{
				"name": "lizzard",
				"action": neko.getSFWLizard
			},
			{
				"name": "foxgirl",
				"action": neko.getSFWFoxGirl
			},
			{
				"name": "nekogif",
				"action": neko.getSFWNekogif
			},
			{
				"name": "kemono",
				"action": neko.getSFWKemonomimi
			},
			{
				"name": "holo",
				"action": neko.getSFWHolo
			},
			{
				"name": "c",
				"init": (msg) => {
					let cuteapiTypes = config.cuteapi.types;
					let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1];
					let hasType = cuteapiTypes.some((cuteType) => {
																											return cuteType.name === maybeType
																										});
					let randomType = cuteapiTypes[Math.floor(Math.random()*cuteapiTypes.length)];
					let type = hasType ? {"name": maybeType} : randomType;
			    return {"type": type.name};
				},
				"title": (state) => {
					if(!mention){
						return `${author} recibiste ${state.type}`
					}else{
						return `${mention} recibiste ${state.type} de ${author}`;
					}
				},
				"action": (state) => {
					isNSFW = false;
					return cuteapi.getJSON(state.type, isNSFW);
				}
			}
		];

		let NSFWCommands = [
			{
				"name": "eron",
				"action": neko.getNSFWEroNeko
			},
			{
				"name": "holoero",
				"action": neko.getNSFWHoloEro
			},
			{
				"name": "patas",
				"action": neko.getSFWEroFeet
			},
			{
				"name": "loli",
				"action": neko.getNSFWSmallBoobs
			},
			{
				"name": "pussy",
				"action": neko.getNSFWPussyGif
			},
			{
				"name": "analart",
				"action": neko.getNSFWAnalArts
			},
			{
				"name": "lewdnekogif",
				"action": neko.getNSFWNekoGif
			},
			{
				"name": "pussyart",
				"action": neko.getNSFWPussyArt
			},
			{
				"name": "pwankg",
				"action": neko.getNSFWPussyWankGif
			},
			{
				"name": "eroyuri",
				"action": neko.getNSFWEroYuri
			},
			{
				"name": "erokemo",
				"action": neko.getNSFWEroKemonomimi
			},
			{
				"name": "blowjob",
				"action": neko.getNSFWBlowJob
			},
			{
				"name": "trap",
				"action": neko.getNSFWTrap
			},
			{
				"name": "tits",
				"action": neko.getNSFWTits
			},
			{
				"name": "solo",
				"action": neko.getNSFWGirlSolo
			},
			{
				"name": "solog",
				"action": neko.getNSFWGirlSoloGif
			},
			{
				"name": "anal",
				"action": neko.getNSFWAnal
			},
			{
				"name": "kuni",
				"action": neko.getNSFWKuni
			},
			{
				"name": "random",
				"action": neko.getNSFWRandomHentaiGif
			},
			{
				"name": "lewdkemo",
				"action": neko.getNSFWKemonomimi
			},
			{
				"name": "feet",
				"action": neko.getNSFWFeet
			},
			{
				"name": "ero",
				"action": neko.getNSFWEro
			},
			{
				"name": "cumart",
				"action": neko.getNSFWCumArts
			},
			{
				"name": "cum",
				"action": neko.getNSFWCumsluts
			},
			{
				"name": "classic",
				"action": neko.getNSFWClassic
			},
			{
				"name": "pussy",
				"action": neko.getNSFWPussy
			},
			{
				"name": "futanari",
				"action": neko.getNSFWFutanari
			},
			{
				"name": "boobs",
				"action": neko.getNSFWBoobs
			},
			{
				"name": "keta",
				"action": neko.getNSFWKeTa
			},
			{
				"name": "bj",
				"action": neko.getNSFWBj
			},
			{
				"name": "erok",
				"action": neko.getNSFWEroKitsune
			},
			{
				"name": "hololewd",
				"action": neko.getNSFWHolo
			},
			{
				"name": "yuri",
				"action": neko.getNSFWYuri
			},
			{
				"name": "feetgif",
				"action": neko.getNSFWFeetGif
			},
			{
				"name": "lewdk",
				"action": neko.getNSFWKitsune
			},
			{
				"name": "lewd",
				"action": neko.getNSFWNeko
			},
			{
				"name": "femdom",
				"action": neko.getNSFWFemdom
			},
			{
				"name": "hentai",
				"action": neko.getNSFWHentai
			},
			{
				"name": "les",
				"action": neko.getNSFWLesbian
			}
		];

		function dispatch(commandList, isCommandListNSFW) {
			for (var i = commandList.length - 1; i >= 0; i--) {
				let command = commandList[i];
				let fullCommandName = prefix + command.name;
				let isValidMention = (hasMention && command.mention) || !command.mention;

				if(cmd === fullCommandName) {
					let isCommandEnable = config.commands.some(c => {
						return c.name === command.name && (c.enable === undefined || c.enable === true);
					});
					if(!isCommandEnable) {
						return;
					}

					if(!isNSWFChannel && isCommandListNSFW) {
						(async () => {
							msg.channel.send(`\`${fullCommandName}\` es NSFW solo funciona dentro de un canal NSFW`);
						})();
						return;
					}
					if (isValidMention) {
						(async () => {
							let state = command.init instanceof Function ? command.init(msg) : undefined;
							let imgUrl = (await command.action(state)).url;
							let title = command.title instanceof Function ? command.title(state) : command.title || "";
							msg.channel.send(famfamoMsg(title, imgUrl));
						})();
					}
					else {
						(async () => {
							msg.channel.send(`\`${fullCommandName}\` necesita una mencion`);
						})();
					}

				}

			}
		}

		dispatch(commands, false);
		dispatch(NSFWCommands, true);

	});
}