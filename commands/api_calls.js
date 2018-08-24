const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')
var Client = require('node-rest-client').Client;
var client = new Client();

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
        let reply = new message.BaseMessage(msg)
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

      let reply = new message.BaseMessage(msg)
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
    'name': 'r34',
    'nsfw': true,
    'execute' : async (msg) =>{
      let searchTerm = utils.getMessage(msg)

      // Parse the Spaces to a _ for the search
      let parsed = searchTerm.replace(" ","_");

      client.get(`https://rule34.xxx/index.php?page=dapi&s=post&q=index&tags=${parsed}`, function (data, response) {
      // Search the data and parse it to a json
      let info = data;

      // Get the random post
      let randomPost = Math.floor(Math.random() * (0 - 5)) + 5;

      // Validation of nothing found
      if (info.posts.$.count == '0') return msg.channel.send("No pude encontrar nada, marrano")

      // Parse of posts
      let post = info.posts.post;

      // TODO: Resolve this bug (Maybe library bug?)
      // Handler of random bug
      if (post[randomPost].$ == undefined) return msg.channel.send("No pude encontrar nada con ese nombre, intenta con otra cosa, marrano")

      // Get the Image
      let imagen = post[randomPost].$.file_url;

      // Set the embed for the chat
      let reply = new message.BaseMessage(msg)
        reply.setTitle(`Resultados de ${parsed}`)
        reply.setColor(0x74DF00)
        reply.setImage(imagen)
        msg.channel.send(reply)
    });
    }
  }),
  ]
}
