const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
let stats = require('fire-emblem-heroes-stats')
const message = require('../core/message.js')

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'clima',
    'execute': async (msg) => {
      let apiKey = process.env.OPEN_WEATHER_KEY
      let city = utils.getMessage(msg)
      let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`
      let params = {'url': url, 'json': true}
      clients.request(params)
      .then(weather => {
        let reply = new message.BaseMessage()
        reply.setTitle(`Clima en ${weather.name}`)
        reply.addField("Temperatura", `${weather.main.temp}°C`,true)
        reply.addField("Presión", `${weather.main.pressure} hPa`,true)
        reply.addField("Humedad", `${weather.main.humidity}%`,true)
        reply.addField("Viento", `${weather.wind.speed} km/h`,true)
        reply.addField("Clima", `${weather.weather[0].description}`,true)
        reply.addField("Pais", `${weather.sys.country}`,true)
        reply.setColor(utils.randomColors())
        reply.setTimestamp()
        msg.channel.send(reply)
      })
      .catch(e => {
          utils.sendText(msg, 'No pude encontrar nada con esa ciudad :c')
      })

    }
  }),

  new CustomCommand({
    'name': 'lolinfo',
    'execute': async (msg) => {
      let searchTerm = utils.getMessage(msg)
      let apikey = process.env.RIOT_API_KEY

      let url_id_summoner = `https://la2.api.riotgames.com/lol/summoner/v3/summoners/by-name/${searchTerm}?api_key=${apikey}`
      let get_id_summoner = {'url': url_id_summoner,'json':true}
      let info = await clients.request(get_id_summoner)

      let summonerId = info.id;
      let summonerIconId = info.profileIconId;
      let summonerIcon = `http://ddragon.leagueoflegends.com/cdn/8.14.1/img/profileicon/${summonerIconId}.png`
      let level = info.summonerLevel;
      let urlMastery = `https://la2.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${apikey}`
      let get_mastery_summoner = {'url': urlMastery, 'json':true}
      let infos = await clients.request(get_mastery_summoner)

      var masteryLevel = "Sin Informacion"
      var masteryPoints = "Sin Informacion"
      var championId = "Sin Informacion"
      var championName = "Sin Informacion"
      var championDescription = "Sin Informacion"
      if(infos.length > 0) {
        masteryLevel = infos[0].championLevel
        masteryPoints = infos[0].championPoints
        championId = infos[0].championId

        let url_champion_name = `https://la2.api.riotgames.com/lol/static-data/v3/champions/${championId}?locale=es_AR&api_key=${apikey}`
        let get_champion_name = {'url': url_champion_name,'json': true}
        let moreInfo = await clients.request(get_champion_name)
        championName = moreInfo.name
        championDescription = moreInfo.title
      }

      let reply = new message.BaseMessage()
      reply.setTitle(`Informacion de ${searchTerm}`)
      reply.setThumbnail(summonerIcon)
      reply.addField("Nivel de Invocador",`${level}`)
      reply.addField("Campeon con más maestria",`${championName} *${championDescription}*`)
      reply.addField("Nivel / Puntos de maestria",`${masteryLevel} / ${masteryPoints}`)
      reply.setColor(0x74D92D)
      msg.channel.send(reply)
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
    'name': 'hero',
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)
      if(utils.isEmpty(searchTerm)){
        utils.sendText(msg, 'Aber pendejo, dame algo para buscar')
        return
      }
      let info = stats.getHero(`${searchTerm}`)
      let name = info.name;
      msg.channel.send(`${name}`)
    }
  }),

  new CustomCommand({
    'name': 'fheros',
    'execute' : async (msg) =>{
      const event = stats.getAllHeroes();
      msg.channel.send(`${event}`)
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
    'name': 'choose',
    'execute': (msg) => {
      let items = msg.content.split(" ").slice(1);
      if (items.length <= 1){
        msg.delete();
        return msg.channel.send("Necesito más de un item para elegir, pendejo")
      }
      let choose = items[Math.floor(Math.random() * items.length)];
      msg.channel.send(`**Yo elijo** ${choose} 🎱`);
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
  }),

  new CustomCommand({
    'name': 'umiyar',
    'execute': msg => {
      msg.delete()
      msg.channel.awaitMessages(username => username, {
        max: 1,
        time: 300000,
        errors: ['time'],
      }).then((collected) => {
        let reply = new message.BaseMessage()
        reply.setTitle(`**${collected.first().author.username}** te umiyaron`)
        reply.setColor(0x74DF00)
        reply.setImage("https://cdn.discordapp.com/emojis/449830856211693578.png")
        msg.channel.send(reply)
      }).catch(() => {
        msg.channel.send('Nadie escribió nada :c')
      })
    }
  })
  ]
}
