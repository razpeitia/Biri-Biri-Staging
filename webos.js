exports.webos = function (bot){
const Discord = require("discord.js");
	bot.on("message", msg => {
		if(msg.author.id === "159985870458322944"){
				var test = ['40', '25', '15'];
				if (msg.content === '40' || msg.content === '25' || msg.content === '15') {
					var usermentioned = msg.mentions.members.first();
		     		const embed = new Discord.RichEmbed()
						.addField("Webos que <:pacman:420980551105642516>",`<@${usermentioned.id}>`) //
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    			msg.channel.send({embed});

	    			let sdc = msg.guild.roles.get("432982578920816640");
	    			let acended = msg.guild.roles.get("404711787414421525");
	    			let fresh = msg.guild.roles.get("404508273635491842");

	    			if (usermentioned.roles.has("432982578920816640")){
	    				usermentioned.removeRole(sdc.id).catch(console.error);
	    			}
	    			if (usermentioned.roles.has("404711787414421525")){
	    				usermentioned.removeRole(acended).catch(console.error);
	    			}
	    			if (usermentioned.roles.has("404508273635491842")){
	    				usermentioned.removeRole(fresh).catch(console.error);
	    			}
	    		}
			}
		});
};