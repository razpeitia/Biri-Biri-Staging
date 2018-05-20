exports.roles = function (bot){
const prefix = "n!";
const Discord = require("discord.js");

bot.on("message", msg =>{

	if (msg.content.startsWith(prefix + "marrano")){
		let role = msg.guild.roles.get(" Role ");
		
		let guildMember = msg.member;
		let author = msg.author.username;

		if(msg.member.roles.has(" Role ")) {
		  const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    msg.channel.send({embed});
		} else {
		  	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ahora tienes el rol de Marrano <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});

		guildMember.addRole(role).catch(console.error);
		}	
	}


	if (msg.content.startsWith(prefix + "nomarrano")){
		let role = msg.guild.roles.get(" Role ");

		let guildMember = msg.member;

		let author = msg.author.username;

		if(msg.member.roles.has(" Role ")) {
			const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya no tienes el rol de Marrano <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});
	    	guildMember.removeRole(role).catch(console.error);
		} else {
	    	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "No tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	   		msg.channel.send({embed});
		}
	}


	if (msg.content.startsWith(prefix + "dev")){
		let role = msg.guild.roles.get(" Role ");
		
		let guildMember = msg.member;
		let author = msg.author.username;
		
		if(msg.member.roles.has(" Role ")) {
		  const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    msg.channel.send({embed});
		} else {
		  	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ahora tienes el rol de Dev <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});

		guildMember.addRole(role).catch(console.error);
		}	
	}


	if (msg.content.startsWith(prefix + "nodev")){
		let role = msg.guild.roles.get(" Role ");

		let guildMember = msg.member;
		let author = msg.author.username;
		
		if(msg.member.roles.has(" Role ")) {
			const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya no tienes el rol de Dev <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});
	    	guildMember.removeRole(role).catch(console.error);
		} else {
	    	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "No tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	   		msg.channel.send({embed});
		}
	}



	if (msg.content.startsWith(prefix + "realtalk")){
		let role = msg.guild.roles.get(" Role ");
		
		let guildMember = msg.member;
		let author = msg.author.username;
		if(msg.member.roles.has(" Role ")) {
		  const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    msg.channel.send({embed});
		} else {
		  	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ahora tienes el rol de Real Talk <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});

		guildMember.addRole(role).catch(console.error);
		}	
	}


	if (msg.content.startsWith(prefix + "norealtalk")){
		let role = msg.guild.roles.get(" Role ");

		let guildMember = msg.member;
		let author = msg.author.username;
				if(msg.member.roles.has(" Role ")) {
			const embed = new Discord.RichEmbed()
						.addField(`${author}`, "Ya no tienes el rol de realtalk <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    	msg.channel.send({embed});
	    	guildMember.removeRole(role).catch(console.error);
		} else {
	    	const embed = new Discord.RichEmbed()
						.addField(`${author}`, "No tienes este rol <:pacman:420980551105642516>")
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	   		msg.channel.send({embed});
		}
	}
});
}