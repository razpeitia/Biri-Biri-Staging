const prefix = 'n!'
const Discord = require('discord.js')
const NekoClient = require('nekos.life')
const CuteAPI = require('cuteapi')
const config = require('./config_commands.json')
const Cooldown = require('cooldown')

const neko = new NekoClient()
const cuteapi = new CuteAPI(config.cuteapi_token)

function famfamoMsg (title, imgUrl) {
  const color = 0xff0000
  const footer = ['© FAMFAMO ~ ', 'https://cdn.discordapp.com/emojis/411791637870542851.png']
  return new Discord.RichEmbed()
    .setTitle(title)
    .setColor(color)
    .setImage(imgUrl)
    .setFooter(...footer)
}

function hasMention (msg) {
  return msg.mentions.members.length > 0
}

async function sendfamfamoMessage (msg, command) {
  let state = command.init instanceof Function ? command.init(msg) : {}
  state.author = msg.author.username
  state.mention = hasMention(msg) ? msg.mentions.members.first().user.username : undefined
  let imgUrl = (await command.action(state)).url
  let title = command.title instanceof Function ? command.title(state) : command.title || ''
  msg.channel.send(famfamoMsg(title, imgUrl))
}

function dispatch (msg, commands) {
  commands.filter(command => {
    // Check if it matches the command name
    let cmd = msg.content.trim().split(' ', 1)[0].toLowerCase()
    return cmd === (prefix + command.name)
  }).filter(command => {
    // Check if the command is enable
    let configCommands = config.commands || []
    return !configCommands
      .filter(c => { return c.name === command.name })
      .some(c => { return c.enable === false })
  }).filter(command => {
    // Check for cooldown
    if (command.cooldown === undefined) {
      return true
    }
    return command.cooldown.fire()
  }).filter(command => {
    // Check if mention was required and it has a mention
    return (hasMention(msg) && command.mention) || !command.mention
  }).filter(command => {
    // Check if command is appropiate for channel
    return msg.channel.nsfw || !(command.nsfw === true)
  }).forEach(command => {
    sendfamfamoMessage(msg, command)
  })
}

let commands = [
  {
    'name': 'roll',
    'init': (msg) => {
      let maybeNumber = msg.content.trim().split(/\s+/)[1]
      let sides = /^\d{1,3}$/.test(maybeNumber) ? Number.parseInt(maybeNumber) : 6
      let randomNumber = Math.floor(Math.random() * sides) + 1
      return {'number': randomNumber, 'sides': sides}
    },
    'title': (state) => {
      return `**${state.author}** te sacaste un ${state.number} de un dado de ${state.sides} caras`
    },
    'action': (state) => { return {url: ''} }
  },
  {
    'name': 'pat',
    'mention': true,
    'action': neko.getSFWPat,
    'title': state => { return `**${state.mention}** *recibiste un pat de* **${state.author}**` }
  },
  {
    'name': 'kiss',
    'mention': true,
    'action': neko.getSFWKiss,
    'title': state => { return `**${state.mention}** recibiste un beso de **${state.author}**` }
  },
  {
    'name': 'slap',
    'mention': true,
    'action': neko.getSFWSlap,
    'title': state => { return `**${state.mention}** recibiste un Slap de **${state.author}**` }
  },
  {
    'name': 'hug',
    'mention': true,
    'action': neko.getSFWHug,
    'title': state => { return `**${state.mention}** recibiste un Abrazo de **${state.author}**` }
  },
  {
    'name': 'poke',
    'mention': true,
    'action': neko.getSFWPoke,
    'title': state => { return `**${state.mention}** recibiste un Poke de **${state.author}**` }
  },
  {
    'name': 'feed',
    'mention': true,
    'action': neko.getSFWFeed,
    'title': state => { return `**${state.mention}** te está alimentando **${state.author}**` }
  },
  {
    'name': 'meaw',
    'action': neko.getSFWNeko
  },
  {
    'name': 'cuddle',
    'mention': true,
    'action': neko.getSFWCuddle,
    'title': state => { return `**${state.mention}** recibiste un Abrazo de **${state.author}**` }
  },
  {
    'name': 'flip',
    'init': (msg) => {
      if (Math.round(Math.random()) === 1) {
        return {'lado': 'aguila', 'url': 'https://i.imgur.com/VpcIiTD.gif'}
      }
      return {'lado': 'sol', 'url': 'https://i.imgur.com/3ECJb4T.gif'}
    },
    'title': (state) => { return `**${state.author}** te sacaste ${state.lado}` },
    'action': (state) => { return {'url': state.url} },
    'cooldown': new Cooldown(30 * 1000) // 30 seconds
  },
  {
    'name': 'tickle',
    'action': neko.getSFWTickle
  },
  {
    'name': 'lizzard',
    'action': neko.getSFWLizard
  },
  {
    'name': 'foxgirl',
    'action': neko.getSFWFoxGirl
  },
  {
    'name': 'nekogif',
    'action': neko.getSFWNekogif
  },
  {
    'name': 'kemono',
    'action': neko.getSFWKemonomimi
  },
  {
    'name': 'holo',
    'action': neko.getSFWHolo
  },
  {
    'name': 'triggered',
    'init': (msg) => {
      let mention = hasMention ? msg.mentions.members.first().user : msg.author
      return {'mention': mention}
    },
    'title': (state) => {
      return `**${state.mention.username}** ha sido triggereado`
    },
    'action': async (state) => {
      let url = `https://cdn.discordapp.com/avatars/${state.mention.id}/${state.mention.avatar}.jpg?size=2048`
      let imgUrl = await cuteapi.generate('triggered', url)
      return {'url': imgUrl}
    }
  },
  {
    'name': 'c',
    'init': (msg) => {
      let types = config.cuteapi.types
      let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1]
      let hasType = types.some((cuteType) => { return cuteType === maybeType })
      let type = hasType ? maybeType : types[Math.floor(Math.random() * types.length)]
      return {'type': type}
    },
    'title': (state) => { return `Usted a recibido un(a) ${state.type}` },
    'action': (state) => { return cuteapi.getJSON(state.type, false) }
  },
  // NSFW Commands
  {
    'name': 'eron',
    'action': neko.getNSFWEroNeko,
    'nsfw': true
  },
  {
    'name': 'holoero',
    'action': neko.getNSFWHoloEro,
    'nsfw': true
  },
  {
    'name': 'patas',
    'action': neko.getSFWEroFeet,
    'nsfw': true
  },
  {
    'name': 'loli',
    'action': neko.getNSFWSmallBoobs,
    'nsfw': true
  },
  {
    'name': 'pussy',
    'action': neko.getNSFWPussyGif,
    'nsfw': true
  },
  {
    'name': 'analart',
    'action': neko.getNSFWAnalArts,
    'nsfw': true
  },
  {
    'name': 'lewdnekogif',
    'action': neko.getNSFWNekoGif,
    'nsfw': true
  },
  {
    'name': 'pussyart',
    'action': neko.getNSFWPussyArt,
    'nsfw': true
  },
  {
    'name': 'pwankg',
    'action': neko.getNSFWPussyWankGif,
    'nsfw': true
  },
  {
    'name': 'eroyuri',
    'action': neko.getNSFWEroYuri,
    'nsfw': true
  },
  {
    'name': 'erokemo',
    'action': neko.getNSFWEroKemonomimi,
    'nsfw': true
  },
  {
    'name': 'blowjob',
    'action': neko.getNSFWBlowJob,
    'nsfw': true
  },
  {
    'name': 'trap',
    'action': neko.getNSFWTrap,
    'nsfw': true
  },
  {
    'name': 'tits',
    'action': neko.getNSFWTits,
    'nsfw': true
  },
  {
    'name': 'solo',
    'action': neko.getNSFWGirlSolo,
    'nsfw': true
  },
  {
    'name': 'solog',
    'action': neko.getNSFWGirlSoloGif,
    'nsfw': true
  },
  {
    'name': 'anal',
    'action': neko.getNSFWAnal,
    'nsfw': true
  },
  {
    'name': 'kuni',
    'action': neko.getNSFWKuni,
    'nsfw': true
  },
  {
    'name': 'random',
    'action': neko.getNSFWRandomHentaiGif,
    'nsfw': true
  },
  {
    'name': 'lewdkemo',
    'action': neko.getNSFWKemonomimi,
    'nsfw': true
  },
  {
    'name': 'feet',
    'action': neko.getNSFWFeet,
    'nsfw': true
  },
  {
    'name': 'ero',
    'action': neko.getNSFWEro,
    'nsfw': true
  },
  {
    'name': 'cumart',
    'action': neko.getNSFWCumArts,
    'nsfw': true
  },
  {
    'name': 'cum',
    'action': neko.getNSFWCumsluts,
    'nsfw': true
  },
  {
    'name': 'classic',
    'action': neko.getNSFWClassic,
    'nsfw': true
  },
  {
    'name': 'pussy',
    'action': neko.getNSFWPussy,
    'nsfw': true
  },
  {
    'name': 'futanari',
    'action': neko.getNSFWFutanari,
    'nsfw': true
  },
  {
    'name': 'boobs',
    'action': neko.getNSFWBoobs,
    'nsfw': true
  },
  {
    'name': 'keta',
    'action': neko.getNSFWKeTa,
    'nsfw': true
  },
  {
    'name': 'bj',
    'action': neko.getNSFWBj,
    'nsfw': true
  },
  {
    'name': 'erok',
    'action': neko.getNSFWEroKitsune,
    'nsfw': true
  },
  {
    'name': 'hololewd',
    'action': neko.getNSFWHolo,
    'nsfw': true
  },
  {
    'name': 'yuri',
    'action': neko.getNSFWYuri,
    'nsfw': true
  },
  {
    'name': 'feetgif',
    'action': neko.getNSFWFeetGif,
    'nsfw': true
  },
  {
    'name': 'lewdk',
    'action': neko.getNSFWKitsune,
    'nsfw': true
  },
  {
    'name': 'lewd',
    'action': neko.getNSFWNeko,
    'nsfw': true
  },
  {
    'name': 'femdom',
    'action': neko.getNSFWFemdom,
    'nsfw': true
  },
  {
    'name': 'hentai',
    'action': neko.getNSFWHentai,
    'nsfw': true
  },
  {
    'name': 'les',
    'action': neko.getNSFWLesbian,
    'nsfw': true
  }
]

exports.emotions = (bot) => { bot.on('message', msg => { dispatch(msg, commands) }) }
