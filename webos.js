exports.webos = function (bot){
const Discord = require("discord.js");
	bot.on("message", msg => {
		if(msg.author.id === "159985870458322944"){
				var test = ['40', '25', '15']; 
				if (test.some((v) => msg.content.toLowerCase().includes(v) )) {
					var usermentioned = msg.mentions.members.first();
		     		const embed = new Discord.RichEmbed()
						.addField("Webos que <:pacman:420980551105642516>",`<@${usermentioned.id}>`) //
						.setColor(0xff0000)
						.setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
	    			msg.channel.send({embed});

	    			let sdc = msg.guild.roles.get(" Rol ");
	    			let acended = msg.guild.roles.get(" Rol ");
	    			let fresh = msg.guild.roles.get(" Rol ");

	    			if (usermentioned.roles.has(" Rol ")){
	    				usermentioned.removeRole(sdc.id).catch(console.error);
	    			}
	    			if (usermentioned.roles.has(" Rol ")){
	    				usermentioned.removeRole(acended).catch(console.error);
	    			}
	    			if (usermentioned.roles.has(" Rol ")){
	    				usermentioned.removeRole(fresh).catch(console.error);
	    			}
	    		}
			}
		});
};