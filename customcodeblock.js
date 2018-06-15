exports.customcodeblock = function (bot){

const prefix = "n!";
const Discord = require("discord.js");

/* --------------

     Codeblock
  
--------------- */

	/*
	bot.on('message', msg => {


	});*/

/* --------------

    Dab Codeblock
  
--------------- */

bot.on('message', msg =>{
	var imgDab = [
		"https://cdn.weeb.sh/images/S1TQsg1c-.jpeg",
		"https://cdn.weeb.sh/images/HJxaUzSa-.jpeg",
		"https://cdn.weeb.sh/images/HyZZ2xJ5b.gif",
		"https://cdn.weeb.sh/images/r13gL0tTb.png",
		"https://media.giphy.com/media/ordLtY9K29ZMk/giphy.gif"
	];
	var randomDab = Math.floor(Math.random()*imgDab.length);

	var textDab = [
		"#DabIsDead",
		"Dabear es de nubs",
		"El Dab está fuera de moda"
	];

	var randomText = Math.floor(Math.random()*textDab.length);

	if(msg.content.startsWith(prefix + "dab")){
			const embed = new Discord.RichEmbed()
						.setTitle(`${textDab[randomText]}`)
						.setImage(imgDab[randomDab])
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
			msg.channel.send({embed}).catch(console.error);
		}
	});

/* --------------

    Culiar/Wag Codeblock
  
--------------- */

	bot.on('message', msg => {
		var textArray = [
		    "https://cdn.discordapp.com/attachments/422831676155232267/450890728084733954/46782b53-e91a-4957-8aa5-af74b911f2ad.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/450890837149089793/tenor.gif",
		    "https://media.giphy.com/media/Saavhnp9YYN7a/giphy.gif",
		    "https://cdn.discordapp.com/attachments/451019016652324874/451191910657163265/SelfassuredAbleGermanshorthairedpointer-size_restricted.gif",
		    "https://cdn.discordapp.com/attachments/451019016652324874/451191909185224725/unnamed_3.gif",
		    "https://cdn.discordapp.com/attachments/451019016652324874/451191908744560643/unnamed_2.gif",
		    "https://cdn.discordapp.com/attachments/451019016652324874/451191908744560641/unnamed_5.gif",
		    "https://cdn.discordapp.com/attachments/439976223104303134/451201080273928232/330554__UNOPT__safe_scootaloo_gif_chicken.gif",
		    "https://cdn.discordapp.com/attachments/439976223104303134/451201073743527947/zzzzz.gif",
		    "https://cdn.discordapp.com/attachments/439976223104303134/451200701637591070/weird-funny-gif-mini-me.gif",
		    "https://cdn.discordapp.com/attachments/439976223104303134/451200671102795777/1365623937070.gif",
		    "https://cdn.discordapp.com/attachments/451019016652324874/455386923683414026/unnamed_4.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389300633370625/unnamed_8.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389301220442112/unnamed_6.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389301220442113/unnamed_7.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389331729940490/unnamed_1.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389331729940491/unnamed.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389362134450177/unnamed_3.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389362134450177/unnamed_3.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389419231379486/1482958306_16e0bd444240f2b7bd0312a67f6af211.gif",
		    "https://cdn.discordapp.com/attachments/422831676155232267/455389421198508042/aa2.gif"
		];
		var randomNumber = Math.floor(Math.random()*textArray.length);		
		var wagArray = [
		    "https://cdn.weeb.sh/images/rynHqkKD-.gif",
		    "https://cdn.weeb.sh/images/HkgnV9JYD-.jpeg",
		    "https://cdn.weeb.sh/images/S1ircyFwb.gif",
		    "https://cdn.weeb.sh/images/ByJ85ktDb.gif",
		    "https://cdn.weeb.sh/images/rJtHqkYw-.gif",
		    "https://cdn.weeb.sh/images/rJCVcytDW.gif",
		    "https://cdn.weeb.sh/images/ByQUc1YP-.jpeg",
		    "https://cdn.weeb.sh/images/HklUqyFP-.gif"
		];
		var randomWag = Math.floor(Math.random()*wagArray.length);

		if(msg.content.startsWith(prefix + "culear") || msg.content.startsWith(prefix + "culiar")){
		let author = msg.author.username;
		let hasMention = msg.mentions.members.first() !== undefined;
		let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
		if(!mention) return msg.channel.send(`${author}, Debes mencionar a alguien para culear, pendejo`);
		if(mention == author) return msg.channel.send(`No te puedes culear a ti mismo, pendejo`);

			const embed = new Discord.RichEmbed()
						.setTitle(`${mention}, te esta culeando ${author}`)
						.setImage(textArray[randomNumber])
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
					msg.channel.send({embed}).catch(console.error);
		}
		if(msg.content.startsWith(prefix + "wag")){
			const embed = new Discord.RichEmbed()
						.setImage(wagArray[randomWag])
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
					msg.channel.send({embed}).catch(console.error);
		}
	});

/* --------------

    Lovecalc Codeblock
  
--------------- */

	bot.on('message', msg => {
		if(msg.content.startsWith(prefix + "lovecalc")){
			let author = msg.author.username;
			let hasMention = msg.mentions.members.first() !== undefined;
			let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
			let mention2 = hasMention ? msg.mentions.members.last().user.username : undefined;
			if(!mention && !mention2) return msg.channel.send(`Se debe mencionar a alguien para calcular, pendejo`);
				let calculado = Math.floor(Math.random() * 101);
			const embed = new Discord.RichEmbed()
						.setTitle(`❤ Calculador de Amor ❤`)
						.addField(`El amor entre ${mention} y ${mention2} es de`, `${calculado}%`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
					msg.channel.send({embed}).catch(console.error);
		}
	});

/* --------------

    Rate Codeblock
  
--------------- */

	bot.on('message', msg => {
    
		if(msg.content.startsWith(prefix + "rate")){
			let author = msg.author.username;
			let mensaje = msg.content.split(' ')[1];
			if(!mensaje) return msg.channel.send(`Se debe meter algo a alguien para ratear, pendejo`);
			let calculado = Math.floor(Math.random() * 101);
			const embed = new Discord.RichEmbed()
						.setDescription(`La puntuacion de **${mensaje}** es de **${calculado}**/100`)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
			msg.channel.send({embed}).catch(console.error);

		}
	});


/* --------------

     Avatar - Ping Codeblock
  
--------------- */

	
	bot.on('message', msg => {

		if(msg.content.startsWith(prefix + "ping")) {
	        msg.channel.send(new Date().getTime() - msg.createdTimestamp + " ms");        
	    }

	    if(msg.content.startsWith(prefix + "avatar")){
			let author = msg.author.username;
			let hasMention = msg.mentions.members.first() !== undefined;
			let mention = hasMention ? msg.mentions.members.first(): undefined;
			if(!mention){
				const embed = new Discord.RichEmbed()
						.setImage(msg.author.avatarURL)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
				msg.channel.send({embed}).catch(console.error);
			}else{
				const embed = new Discord.RichEmbed()
						.setImage(mention.user.avatarURL)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png");
				msg.channel.send({embed}).catch(console.error);
			}
	    }
	});


/* --------------

    Ship Codeblock
  
--------------- */

	
	bot.on('message', msg => {
		if (msg.content.startsWith(prefix + "ship")){
			let author = msg.author.username;
			let hasMention = msg.mentions.members.first() !== undefined;
			let mention = hasMention ? msg.mentions.members.first().user.username : undefined;
			let mention2 = hasMention ? msg.mentions.members.last().user.username : undefined;
			console.log("primera mencion",mention);
			console.log("segunda mencion",mention2);
			let random1 =  Math.floor((Math.random()* 5) + 1);
			let random2 =  Math.floor((Math.random()* 5) + 1);
			let random3 =  Math.floor((Math.random()* 5) + 1);
			let random4	 =  Math.floor((Math.random()* 5) + 1);
			let randomMention1 = mention.slice(random1, random2);
			console.log("random1",randomMention1);
			let randomMention2 = mention2.slice(random3, random4);
			console.log("random2",randomMention2);
			msg.channel.send(`${randomMention1} y ${randomMention2}`);

		}

	});
}