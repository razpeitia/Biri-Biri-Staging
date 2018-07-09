exports.startup = function(bot){

	bot.on('ready', () => {
	  bot.user.setActivity('n!help V3.0', { type: 'WATCHING', url: 'https://twitch.tv/thekazuo'});
	  console.log("")
	  console.log(`Bot iniciado, con ${bot.users.size} usuarios, en ${bot.guilds.size} servidor/es.`);
	  console.log("")
	});


	bot.on('guildMemberAdd',(gm) => {
	    gm.guild.channels
	    .find('name','lobby')
	    .send('Bienvenido '+'<@' + gm.id +  '>' + ' <:vohiyo:412474913883160577>, no olvides leer las <#402905862274023435> <:pacman:420980551105642516>');
	});

	bot.on("disconnect", event => {
	  console.log("Disconnected: " + event.reason + " (" + event.code + ")");
	});

};
