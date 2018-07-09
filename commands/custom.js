const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'clima',
    'execute': async (msg) => {
      // FIXME: Don't hardcode api key
      let apiKey = `f877bb870097bca070d49bca3070cd84`
      let city = utils.getMessage(msg)
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      let params = {'url': url, 'json': true}
      clients.request(params)
      .then(weather => {
        let reply = new message.BaseMessage()
        reply.setTitle(`Clima en ${weather.name}`)
        reply.addField("Temperatura", `${weather.main.temp}°C`,true)
        reply.addField("Presión", `${weather.main.pressure} hPa`,true)
        reply.addField("Humedad", `${weather.main.humidity}%`,true)
        reply.addField("Viento", `${weather.wind.speed} km/h`,true)
        reply.addField("Direccion del viento", `${weather.wind.deg}°`,true)
        reply.addField("Pais", `${weather.sys.country}`,true)
        reply.setColor(0x74DF00)
        reply.setTimestamp()
        msg.channel.send(reply)
      })
      .catch(e => {
          utils.sendText(msg, 'No pude encontrar nada con esa ciudad :c')
      })

    }
  }),

  new CustomCommand({
    'name': 'video',
    'nsfw': true,
    'execute': async (msg) => {
        let searchTerm = utils.getMessage(msg)
        if(utils.isEmpty(searchTerm)) {
          utils.sendText(msg, 'Aber pendejo, necesito un termino')
          return
        }
        const Searcher = new clients.pornsearch()
        let videos = await Searcher.videos()
        if(videos === undefined || videos.length === 0) {
          utils.sendText(msg, `No terminos encontrados para "${searchTerm}"`)
        } else {
          msg.channel.send(`Titulo: ${videos[0].title}`)
          msg.channel.send(`Url: ${videos[0].url}`);
        }
    }
  }),

  new CustomCommand({
    'name': 'serverinfo',
    'execute': (msg) => {
      let reply = new message.BaseMessage()
      reply.setColor(0x74DF00)
      reply.setThumbnail(msg.guild.iconURL)
      reply.setTitle(`Información de ${msg.guild}`, true)
      reply.addField("Dueño del Servidor", msg.guild.owner, true)
      reply.addField("Usuarios", msg.guild.memberCount, true)
      reply.addField("Creado el ", utils.formatDate(msg.guild.createdAt), true)
      msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'userinfo',
    'execute': (msg) => {
      let user = msg.mentions.users.first() || msg.author;
      let join = user.createdAt || msg.author.createdAt;

      let reply = new message.BaseMessage()
      reply.setColor(0x74DF00)
      reply.setThumbnail(user.avatarURL)
      reply.setTitle(`Información de ${user.username}`, true)
      reply.addField(`Nombre Completo:`, user.tag, true)
      reply.addField(`Nickname:`, user.username, true)
      reply.addField("Se unió a discord el: ", utils.formatDate(join),true)
      msg.channel.send(reply)
    }
  }),

  new CustomCommand({
    'name': 'joto',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        msg.channel.send(`**${collected.first().author.username}** es joto <:pacman:420980551105642516>`);
      }).catch(() => {
        msg.channel.send('Nadie escribió nada :c')
      })
    }
  })
  ]
}
