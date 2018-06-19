const prefix = 'n!'
const Discord = require('discord.js')
const client = require("nekos.life")
const cute = require('cuteapi')
const config = require('./config_commands.json')
const Cooldown = require('cooldown')
var request = require('request-promise')

const neko = new client();
const cuteapi = new cute(process.env.CUTE_TOKEN);

function famfamoMsg (title, description, fields, imgUrl) {
  const color = 0xff0000
  const footer = ['© FAMFAMO ~ ', 'https://cdn.discordapp.com/emojis/411791637870542851.png']
  let msg = new Discord.RichEmbed()
  msg.setTitle(title)
  msg.setDescription(description)
  msg.setColor(color)
  msg.setImage(imgUrl)
  fields.forEach((f) => msg.addField(...f))
  msg.setFooter(...footer)
  return msg
}

function countMentions(msg) {
  return msg.mentions.members.size
}

function hasMention (msg) {
  return countMentions(msg) > 0
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getMessage(msg) {
  let arr = msg.content.trim().split(' ')
  arr.shift()
  return arr.join(' ')
}

function combinename(name1, name2) {
  const vowels = ['a','e','i','o','u','y'];
  let count1 =- 1, count2 = -1;
  let mid1 = Math.ceil(name1.length/2)-1;
  let mid2 = Math.ceil(name2.length/2)-1;
  let noVowel1 = false, noVowel2 = false;
  let i;
  for(i = mid1; i >= 0; i--) {
    count1++
    if(vowels.includes(name1.charAt(i).toLowerCase())){
      i = -1;
    } else if(i == 0) {
      noVowel1 = true;
    }
  }
  for(i = mid2; i < name2.length; i++) {
    count2++;
    if(vowels.includes(name2.charAt(i).toLowerCase())){
      i = name2.length;
    } else if(i == name2.length - 1) {
      noVowel2 = true;
    }
  }

  var name = "";
  if(noVowel1 && noVowel2) {
    name = name1.substring(0, mid1 + 1);
    name += name2.substring(mid2);
  } else if(count1 <= count2) {
    name = name1.substring(0,mid1-count1+1);
    name += name2.substring(mid2);
  } else {
    name = name1.substring(0, mid1 + 1);
    name += name2.substring(mid2 + count2);
  }
  return name;
}

async function sendfamfamoMessage (msg, command) {
  let state = command.init instanceof Function ? command.init(msg) : {}
  state.author = msg.author.username
  state.mention = hasMention(msg) ? msg.mentions.members.first().user.username : undefined
  let imgUrl = (await command.image(state)).url
  let title = command.title instanceof Function ? command.title(state) : command.title || ''
  let description = command.description instanceof Function ? command.description(state) : command.description || ''
  let fields = command.fields instanceof Function ? command.fields(state) : command.fields || []
  msg.channel.send(famfamoMsg(title, description, fields, imgUrl))
}

function dispatch (msg, commands) {
  commands.filter(command => {
    // Check if it matches the command name
    let cmd = msg.content.trim().split(' ', 1)[0].toLowerCase()
    let alias = command.alias || [];
    return cmd === (prefix + command.name) || alias.some((a) => { return (prefix + a) === cmd })
  }).filter(command => {
    // El comando esta activo?
    return command.enable === undefined || command.enable === true
  }).filter(command => {
    // El comando esta pausado?
    if (command.cooldown === undefined) {
      return true
    }
    return command.cooldown.fire()
  }).filter(command => {
    // La mencion es requerida?
    return (command.mention === undefined) || (command.mention === countMentions(msg))
  }).filter(command => {
    // El comando y el canal es NSFW?
    return msg.channel.nsfw || !(command.nsfw === true)
  }).forEach(command => {
    // Envia un mensaje por cada comando que pase todos los filtros anteriores
    // Tal vez podemos cambiar esto a un map en el futuro
    sendfamfamoMessage(msg, command)
  })
}

let commands = [
  {
    "name": "comando",
    "init": (msg) => {
      let isAdmin = config.admins.some(uid => { return uid === msg.author.id; });
      let maybeCommand = msg.content.trim().split(/\s+/)[1];
      let maybeAction = msg.content.trim().split(/\s+/)[2];
      let cmds = commands.filter(c => { return c.name === maybeCommand; });
      return {
              "command": maybeCommand,
              "commands": cmds,
              "hasCommands": cmds.length > 0,
              'action': maybeAction,
              "isAdmin": isAdmin
            };
    },
    "title": (state) => {
      if(!state.isAdmin) {
        return `Necesitas ser un admin, pendejo`;
      }
      if(state.command === undefined) {
        return "Necesitas especificar un comando, pendejo";
      }
      if(state.command === "comando") {
        return "No <:wanwan:403968696067948554>";
      }
      if(!state.hasCommands) {
        return `Comando \`${state.command}\` no encontrado`;
      }
      if(state.action !== "activar" && state.action !== "desactivar") {
        return `Necesitas especificar una action "activar" o "desactivar", pendejo`;
      }
      let action = (state.action === "activar") ? "activado" : "desactivado";
      state.commands.forEach(c => { c.enable = (state.action === "activar"); });
      return `(${state.commands.length}) comando ${state.command} ${action}`;
    },
    'image': (state) => {
      return {"url": ""}
    }
  },
  {
    'name': 'dab',
    'init': (msg) => {
      return {
        "img": getRandom(config.dab.images),
        "text": uitls.random(config.dab.texts)
      }
    },
    'title': (state) => { return state.text },
    'image': (state) => { return {url: state.img} }
  },
  {
    'name': 'wag',
    'init': (msg) => { return {img: getRandom(config.wag.images)} },
    'title': (state) => { return '' },
    'image': (state) => { return '' }
  },
  {
    'name': 'culear',
    'alias': ['culiar'],
    'mention': 1,
    'init': (msg) => {
      let author = msg.author.username
      let mention = msg.mentions.members.first().user.username
      if(author !== mention) {
        return {
          title: `${mention}, te esta culeando ${author}`,
          image: getRandom(config.culear.images)
        }
      } else {
        return {
          title: 'No te puedes culear a ti mismo, pendejo',
          image: ''
        }
      }
    },
    'title': (state) => { return state.title },
    'image': (state) => { return {'url': state.image} }
  },
  {
    'name': 'lovecalc',
    'mention': 2,
    'init': (msg) => {
      let mention1 = msg.mentions.members.first().user.username;
      let mention2 = msg.mentions.members.last().user.username;
      if(mention1 !== mention2) {
        let calculado = Math.floor(Math.random() * 101);
        return {
          title: '❤ Calculador de Amor ❤',
          fields: [[`El amor entre ${mention1} y ${mention2} es de`, `${calculado}%`]],
          image: ''
        }
      } else {
        return {'title': 'Forever alone </3', image: ''}
      }
    },
    'title': (state) => { return state.title },
    'fields': (state) => { return state.fields },
    'image': (state) => { return {url: state.image} }
  },
  {
    'name': 'ping',
    'init': (msg) => {
      latency = new Date().getTime() - msg.createdTimestamp
      return {'latency':  latency + ' ms'}
    },
    'title': (state) => { return state.latency },
    'image': (state) => { return {'url': ''} }
  },
  {
    'name': 'rate',
    'init': (msg) => {
      return {
        'valid': msg.content.split(' ').length >= 2,
        'mensaje': getMessage(msg),
        'invalid': 'Se debe meter algo a alguien para ratear, pendejo',
        'calculado': Math.floor(Math.random() * 101)
      }
    },
    'title': (state) => {
      return state.valid ? `La puntuacion de **${state.mensaje}** es de **${state.calculado}**/100` : state.invalid
    },
    'image': (state) => { return {'url': ''} }
  },
  {
    'name': 'avatar',
    'init': (msg) => {
      let avatar = hasMention(msg) ? msg.mentions.members.first().user.avatarURL : msg.author.avatarURL
      return {'avatar': avatar}
    },
    'image': (state) => {
      return {'url': state.avatar}
    }
  },
  {
    'name': 'ship',
    'mention': 2,
    'init': (msg) => {
      return {
        'mention1': msg.mentions.members.first().user.username,
        'mention2': msg.mentions.members.last().user.username
      }
    },
    'title': (state) => {
      return `${state.mention1} y ${state.mention2} = ${combinename(state.mention1, state.mention2)}`;
    },
    'image': (state) => { return {'url': ''} }
  },
  {
    'name': 'birb',
    'title': (state) => { return `${state.author} fue pajaredo!!!!!` },
    'image': async (state) => {
                let response = await request({
                    url: 'https://random.birb.pw/tweet.json/',
                    json: true,
                });
                return {url: `https://random.birb.pw/img/${response.file}`}
            }
  },
  {
    'name': 'dog',
    'title': (state) => { return `<:webos:450520773652905984>` },
    'image': async (state) => {
                let response = await request({
                    url: 'https://dog.ceo/api/breeds/image/random',
                    json: true,
                });
                return {url: `${response.message}`}
            }
  },
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
    'image': (state) => { return {url: ''} }
  },
  {
    'name': 'f',
    'init': (msg) => {
      return {'mensaje': getMessage(msg) }
    },
    'description': (state) => {
      return `**${state.author}** ha dado sus respetos por ${state.mensaje} <:sad:403381288188510210>`
    },
    'image': (state) => { return {'url': ''} }
  },
  {
    'name': 'pat',
    'mention': 1,
    'image': neko.getSFWPat,
    'title': state => { return `**${state.mention}** *recibiste un pat de* **${state.author}**` }
  },
  {
    'name': 'kiss',
    'mention': 1,
    'image': neko.getSFWKiss,
    'title': state => { return `**${state.mention}** recibiste un beso de **${state.author}**` }
  },
  {
    'name': 'slap',
    'mention': 1,
    'image': neko.getSFWSlap,
    'title': state => { return `**${state.mention}** recibiste un Slap de **${state.author}**` }
  },
  {
    'name': 'hug',
    'mention': 1,
    'image': neko.getSFWHug,
    'title': state => { return `**${state.mention}** recibiste un Abrazo de **${state.author}**` }
  },
  {
    'name': 'poke',
    'mention': 1,
    'image': neko.getSFWPoke,
    'title': state => { return `**${state.mention}** recibiste un Poke de **${state.author}**` }
  },
  {
    'name': 'feed',
    'mention': 1,
    'image': neko.getSFWFeed,
    'title': state => { return `**${state.mention}** te está alimentando **${state.author}**` }
  },
  {
    'name': 'meaw',
    'image': neko.getSFWNeko
  },
  {
    'name': 'cuddle',
    'mention': 1,
    'image': neko.getSFWCuddle,
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
    'image': (state) => { return {'url': state.url} },
    'cooldown': new Cooldown(30 * 1000) // 30 seconds
  },
  {
    'name': 'tickle',
    'image': neko.getSFWTickle
  },
  {
    'name': 'lizzard',
    'image': neko.getSFWLizard
  },
  {
    'name': 'foxgirl',
    'image': neko.getSFWFoxGirl
  },
  {
    'name': 'nekogif',
    'image': neko.getSFWNekogif
  },
  {
    'name': 'kemono',
    'image': neko.getSFWKemonomimi
  },
  {
    'name': 'holo',
    'image': neko.getSFWHolo
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
    'image': async (state) => {
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
    'image': (state) => { return cuteapi.getJSON(state.type, false) }
  },
  // NSFW Commands
  {
    'name': 'eron',
    'image': neko.getNSFWEroNeko,
    'nsfw': true
  },
  {
    'name': 'holoero',
    'image': neko.getNSFWHoloEro,
    'nsfw': true
  },
  {
    'name': 'patas',
    'image': neko.getSFWEroFeet,
    'nsfw': true
  },
  {
    'name': 'loli',
    'image': neko.getNSFWSmallBoobs,
    'nsfw': true
  },
  {
    'name': 'pussy',
    'image': neko.getNSFWPussyGif,
    'nsfw': true
  },
  {
    'name': 'analart',
    'image': neko.getNSFWAnalArts,
    'nsfw': true
  },
  {
    'name': 'lewdnekogif',
    'image': neko.getNSFWNekoGif,
    'nsfw': true
  },
  {
    'name': 'pussyart',
    'image': neko.getNSFWPussyArt,
    'nsfw': true
  },
  {
    'name': 'pwankg',
    'image': neko.getNSFWPussyWankGif,
    'nsfw': true
  },
  {
    'name': 'eroyuri',
    'image': neko.getNSFWEroYuri,
    'nsfw': true
  },
  {
    'name': 'erokemo',
    'image': neko.getNSFWEroKemonomimi,
    'nsfw': true
  },
  {
    'name': 'blowjob',
    'image': neko.getNSFWBlowJob,
    'nsfw': true
  },
  {
    'name': 'trap',
    'image': neko.getNSFWTrap,
    'nsfw': true
  },
  {
    'name': 'tits',
    'image': neko.getNSFWTits,
    'nsfw': true
  },
  {
    'name': 'solo',
    'image': neko.getNSFWGirlSolo,
    'nsfw': true
  },
  {
    'name': 'solog',
    'image': neko.getNSFWGirlSoloGif,
    'nsfw': true
  },
  {
    'name': 'anal',
    'image': neko.getNSFWAnal,
    'nsfw': true
  },
  {
    'name': 'kuni',
    'image': neko.getNSFWKuni,
    'nsfw': true
  },
  {
    'name': 'random',
    'image': neko.getNSFWRandomHentaiGif,
    'nsfw': true
  },
  {
    'name': 'lewdkemo',
    'image': neko.getNSFWKemonomimi,
    'nsfw': true
  },
  {
    'name': 'feet',
    'image': neko.getNSFWFeet,
    'nsfw': true
  },
  {
    'name': 'ero',
    'image': neko.getNSFWEro,
    'nsfw': true
  },
  {
    'name': 'cumart',
    'image': neko.getNSFWCumArts,
    'nsfw': true
  },
  {
    'name': 'cum',
    'image': neko.getNSFWCumsluts,
    'nsfw': true
  },
  {
    'name': 'classic',
    'image': neko.getNSFWClassic,
    'nsfw': true
  },
  {
    'name': 'pussy',
    'image': neko.getNSFWPussy,
    'nsfw': true
  },
  {
    'name': 'futanari',
    'image': neko.getNSFWFutanari,
    'nsfw': true
  },
  {
    'name': 'boobs',
    'image': neko.getNSFWBoobs,
    'nsfw': true
  },
  {
    'name': 'keta',
    'image': neko.getNSFWKeTa,
    'nsfw': true
  },
  {
    'name': 'bj',
    'image': neko.getNSFWBj,
    'nsfw': true
  },
  {
    'name': 'erok',
    'image': neko.getNSFWEroKitsune,
    'nsfw': true
  },
  {
    'name': 'hololewd',
    'image': neko.getNSFWHolo,
    'nsfw': true
  },
  {
    'name': 'yuri',
    'image': neko.getNSFWYuri,
    'nsfw': true
  },
  {
    'name': 'feetgif',
    'image': neko.getNSFWFeetGif,
    'nsfw': true
  },
  {
    'name': 'lewdk',
    'image': neko.getNSFWKitsune,
    'nsfw': true
  },
  {
    'name': 'lewd',
    'image': neko.getNSFWNeko,
    'nsfw': true
  },
  {
    'name': 'femdom',
    'image': neko.getNSFWFemdom,
    'nsfw': true
  },
  {
    'name': 'hentai',
    'image': neko.getNSFWHentai,
    'nsfw': true
  },
  {
    'name': 'les',
    'image': neko.getNSFWLesbian,
    'nsfw': true
  }
]

exports.emotions = (bot) => { bot.on('message', msg => { dispatch(msg, commands) }) }
