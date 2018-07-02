exports.custom = function (bot){

  const request = require('request');
  const prefix = "n!";
  const Discord = require('discord.js');

    bot.on('message', msg => {
        if (msg.content.startsWith(prefix + "clima")){

          function getMessage(msg) {
            let arr = msg.content.trim().split(' ')
            arr.shift()
            return arr.join(' ')
          }

          let apiKey = `f877bb870097bca070d49bca3070cd84`;
          let city = getMessage(msg);
          let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

          request(url, function (err, response, body) {
            if(err){
              console.log('error:', error);
            } else {
              let weather = JSON.parse(body)
              if (weather.message === "city not found") return msg.channel.send("No pude encontrar nada con esa ciudad :c")
              const embed = new Discord.RichEmbed()
                  .setTitle(`Clima en ${weather.name}`)
                  .addField("Temperatura", `${weather.main.temp}°C`,true)
                  .addField("Presión", `${weather.main.pressure} hPa`,true)
                  .addField("Humedad", `${weather.main.humidity}%`,true)
                  .addField("Viento", `${weather.wind.speed} km/h`,true)
                  .addField("Direccion del viento", `${weather.wind.deg}°`,true)
                  .addField("Pais", `${weather.sys.country}`,true)
                  .setColor(0x74DF00)
                  .setFooter("© FAMFAMO ~ ", "https://cdn.discordapp.com/emojis/411791637870542851.png")
                            .setTimestamp();
                   msg.channel.send({embed});
            }
          });
        }
    });
  bot.on('message', msg => {
    const Pornsearch = require('pornsearch');
     if(msg.content.startsWith(prefix + "video")){
      if(msg.channel.nsfw === true){
          function getMessage(msg) {
            let arr = msg.content.trim().split(' ')
              arr.shift()
          return arr.join(' ')
          }
        const Searcher = new Pornsearch(getMessage(msg));
        Searcher.videos()
        .then(videos =>{
          msg.channel.send(`Titulo: ${videos[0].title}`)
          msg.channel.send(`Url: ${videos[0].url}`);
        });
      }else{
        msg.channel.send("Solo puedo enviar esto en un canal NSFW, marrano");
      }
    }
  });
  bot.on('message',msg => {
  let user = msg.mentions.users.first() || msg.author;
  let join = user.createdAt || msg.author.createdAt; 
  function formatDate(data) {
    var d = data,
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day,month,year].join('/');
  }
    if(msg.content.startsWith(prefix + "serverinfo")){
      let embed = new Discord.RichEmbed()
        .setColor(0x74DF00)
        .setThumbnail(msg.guild.iconURL)
        .setTitle(`Información de ${msg.guild}`,true)
        .addField("Dueño del Servidor", msg.guild.owner,true)
        .addField("Usuarios",msg.guild.memberCount,true)
        .addField("Creado el ",formatDate(msg.guild.createdAt),true)
      msg.channel.send(embed);
    }

    if(msg.content.startsWith(prefix + "userinfo")){
      let embed = new Discord.RichEmbed()
        .setColor(0x74DF00)
        .setThumbnail(user.avatarURL)
        .setTitle(`Información de ${user.username}`,true)
        .addField(`Nombre Completo:`,user.tag,true)
        .addField(`Nickname:`,user.username,true)
        .addField("Se unió a discord el: ",formatDate(join),true)
      msg.channel.send(embed);
    }
});
};