exports.emotions = function (bot){
const prefix = "n!";
const Discord = require("discord.js");
const client = require('nekos.life');
const cute = require("cuteapi");
const config = require("./config.json");

const neko = new client();
const cuteapi = new cute(config.cuteapi_token);

const cuteapiTypes = [
	"cry",
	"pinch",
	"poke",
	"highfive",
	"nani",
	"punch",
	"hug",
	"nom",
	"woop",
	"cuddle",
	"tickle",
	"slap",
	"smug",
	"sleep",
	"pat",
	"lick",
	"kiss",
	"neko",
	"dancing",
	"triggered",
	"meme",
	"yaoi",
	"loli",
	"yuri"
];
const color = 0xff0000;
const footer = ["© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png"];

bot.on("message", msg =>{
		let isNSWFChannel = msg.channel.nsfw;
		let author = msg.author.username;
		let hasMention = msg.mentions.members.first() !== undefined;
		let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
		let cmd = msg.content.trim().split(" ")[0];

		let commands = [
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
			},
			{
				"name": "cuteapi",
				"init": (msg) => {
					let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1];
					let hasType = cuteapiTypes.includes(maybeType);
					let randomType = cuteapiTypes[Math.floor(Math.random()*cuteapiTypes.length)];
					let type = hasType ? maybeType : randomType;
			    return {"type": type};
				},
				"title": (state) => {
					return `Usted a recibido un(a) ${state.type}`;
				},
				"action": (state) => {
					isNSFW = false;
					return cuteapi.getJSON(state.type, isNSFW);
				}
			}
		];

		let NSFWCommands = [
			{	"name": "eron",
				"mention": false,
				"action": neko.getNSFWEroNeko
			},
			{	"name": "holoero",
				"mention": false,
				"action": neko.getNSFWHoloEro
			},
			{
				"name": "patas",
				"mention": false,
				"action": neko.getSFWEroFeet
			},
			{	"name": "loli",
				"mention": false,
				"action": neko.getNSFWSmallBoobs
			},
			{	"name": "pussy",
				"mention": false,
				"action": neko.getNSFWPussyGif
			},
			{	"name": "analart",
				"mention": false,
				"action": neko.getNSFWAnalArts
			},
			{	"name": "lewdnekogif",
				"mention": false,
				"action": neko.getNSFWNekoGif
			},
			{	"name": "pussyart",
				"mention": false,
				"action": neko.getNSFWPussyArt
			},
			{	"name": "pwankg",
				"mention": false,
				"action": neko.getNSFWPussyWankGif
			},
			{	"name": "eroyuri",
				"mention": false,
				"action": neko.getNSFWEroYuri
			},
			{	"name": "erokemo",
				"mention": false,
				"action": neko.getNSFWEroKemonomimi
			},
			{	"name": "blowjob",
				"mention": false,
				"action": neko.getNSFWBlowJob
			},
			{	"name": "trap",
				"mention": false,
				"action": neko.getNSFWTrap
			},
			{	"name": "tits",
				"mention": false,
				"action": neko.getNSFWTits
			},
			{	"name": "solo",
				"mention": false,
				"action": neko.getNSFWGirlSolo
			},
			{	"name": "solog",
				"mention": false,
				"action": neko.getNSFWGirlSoloGif
			},
			{	"name": "anal",
				"mention": false,
				"action": neko.getNSFWAnal
			},
			{	"name": "kuni",
				"mention": false,
				"action": neko.getNSFWKuni
			},
			{	"name": "random",
				"mention": false,
				"action": neko.getNSFWRandomHentaiGif
			},
			{	"name": "lewdkemo",
				"mention": false,
				"action": neko.getNSFWKemonomimi
			},
			{	"name": "feet",
				"mention": false,
				"action": neko.getNSFWFeet
			},
			{	"name": "ero",
				"mention": false,
				"action": neko.getNSFWEro
			},
			{	"name": "cumart",
				"mention": false,
				"action": neko.getNSFWCumArts
			},
			{	"name": "cum",
				"mention": false,
				"action": neko.getNSFWCumsluts
			},
			{	"name": "classic",
				"mention": false,
				"action": neko.getNSFWClassic
			},
			{	"name": "pussy",
				"mention": false,
				"action": neko.getNSFWPussy
			},
			{	"name": "futanari",
				"mention": false,
				"action": neko.getNSFWFutanari
			},
			{	"name": "boobs",
				"mention": false,
				"action": neko.getNSFWBoobs
			},
			{	"name": "keta",
				"mention": false,
				"action": neko.getNSFWKeTa
			},
			{	"name": "bj",
				"mention": false,
				"action": neko.getNSFWBj
			},
			{	"name": "erok",
				"mention": false,
				"action": neko.getNSFWEroKitsune
			},
			{	"name": "hololewd",
				"mention": false,
				"action": neko.getNSFWHolo
			},
			{	"name": "yuri",
				"mention": false,
				"action": neko.getNSFWYuri
			},
			{	"name": "feetgif",
				"mention": false,
				"action": neko.getNSFWFeetGif
			},
			{	"name": "lewdk",
				"mention": false,
				"action": neko.getNSFWKitsune
			},
			{	"name": "lewd",
				"mention": false,
				"action": neko.getNSFWNeko
			},
			{	"name": "femdom",
				"mention": false,
				"action": neko.getNSFWFemdom
			},
			{	"name": "hentai",
				"mention": false,
				"action": neko.getNSFWHentai
			},
			{	"name": "les",
				"mention": false,
				"action": neko.getNSFWLesbian
			}
		];

		function dispatch(commandList, isCommandListNSFW) {
			for (var i = commandList.length - 1; i >= 0; i--) {
				let command = commandList[i];
				let fullCommandName = prefix + command.name;
				let isValidMention = (hasMention && command.mention) || !command.mention;

				if(cmd === fullCommandName) {
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
							const embed = new Discord.RichEmbed()
													 .setTitle(title)
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
		}

		dispatch(commands, false);
		dispatch(NSFWCommands, true);

	});
}