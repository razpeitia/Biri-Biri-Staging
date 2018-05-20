exports.startup = function(bot){

	bot.on('ready', () => {
	  console.log("")
	  console.log(`Bot iniciado, con ${bot.users.size} usuarios, en ${bot.guilds.size} servidor/es.`);
	  console.log("")
	});


	bot.on('guildMemberAdd',(gm) => {
	    gm.guild.channels
	    .find('name','lobby')
	    .send('Bienvenido '+'<@' + gm.id +  '> + Espero pases un buen rato!');
	});

	bot.on("disconnect", event => {
	  console.log("Disconnected: " + event.reason + " (" + event.code + ")");
	});

};
