const commands = require('../core/command.js')
const message = require('../core/message.js')
const RandomLocalImage = commands.RandomLocalImage
const MentionRandomLocalImage = commands.MentionRandomLocalImage
const CustomCommand = commands.CustomCommand
const ImageTitleCommand = commands.ImageTitleCommand

exports.getCommands = (clients) => {
  let config = clients.config
  return [

  new RandomLocalImage({
    'name': 'dab',
    'images': config.dab.images,
    'titles': config.dab.texts
  }),

  new RandomLocalImage({
    'name': 'wag',
    'images': config.wag.images
  }),

  new MentionRandomLocalImage({
    'name': 'culear',
    'alias': ['culiar','culiada'],
    'selfError': 'No te puedes culear a ti mismo, pendejo!',
    'images': config.culear.images
    'titles': config.culear.texts
  }),

  new MentionRandomLocalImage({
    'name': 'putear',
    'alias': ['putiar','putiza'],
    'selfError': 'No te puedes putear a ti mismo, pendejo',
    'images': config.putear.images,
    'titles': config.putear.texts
  }),

  new CustomCommand({
    'name': 'lovecalc',
    'mention': 2,
    'execute': (msg) => {
      let mention1 = msg.mentions.members.first().user.username
      let mention2 = msg.mentions.members.last().user.username
      let replyMessage = new message.BaseMessage()
      if(mention1 !== mention2) {
        let calculado = Math.floor(Math.random() * 101)
        replyMessage.setTitle('❤ Calculador de Amor ❤')
        replyMessage.addField(`El amor entre ${mention1} y ${mention2} es de`, `${calculado}%`)
      }
      else {
        replyMessage.setTitle('Forever alone </3')
      }
      msg.channel.send(replyMessage)
    }
  }),

  new CustomCommand({
    'name': 'ping',
    'execute': (msg) => {
      latency = new Date().getTime() - msg.createdTimestamp
      let title = 'latency':  latency + ' ms'
      let replyMessage = new message.BaseMessage()
      replyMessage.setTitle(title)
      msg.channel.send(replyMessage)
    }
  }),

  new CustomCommand({
    'name': 'rate',
    'execute': (msg) => {
      let replyMessage = new message.BaseMessage()
      if(msg.content.split(' ').length >= 2) {
        let restMessage = getMessage(msg)
        let calculado = Math.floor(Math.random() * 101)
        let title = `La puntuacion de **${restMessage}** es de **${calculado}**/100`
        replyMessage.setTitle(title)
      } else {
        replyMessage.setTitle('Se debe meter algo a alguien para ratear, pendejo')
      }
      msg.channel.send(replyMessage)
    }
  }),

  new ImageTitleCommand({
    'name': 'avatar',
    'image': () => {
      if(hasMention(msg))
        return msg.mentions.members.first().user.avatarURL
      else
        return msg.author.avatarURL
    }
  }),

  new ImageTitleCommand({
    'name': 'birb',
    'image': async () => {
      let params = {
        'url': 'https://random.birb.pw/tweet.json/',
        'json': true
      }
      let response = await clients.request(params)
      return `https://random.birb.pw/img/${response.file}`
    },
    'title': '%(author)s fue pajaredo!!!!!'
  }),

  new ImageTitleCommand({
    'name': 'dog',
    'title': '<:webos:450520773652905984>'
    'image': async () => {
      let params = {
        'url': 'https://dog.ceo/api/breeds/image/random',
        'json': true
      }
      let response = await clients.request(params)
      return {url: `${response.message}`}
    }
  }),

  new CustomCommand({
    'name': 'roll',
    'execute': (msg) => {
      let maybeNumber = msg.content.trim().split(/\s+/)[1]
      let sides = /^\d{1,3}$/.test(maybeNumber) ? Number.parseInt(maybeNumber) : 6
      let randomNumber = Math.floor(Math.random() * sides) + 1
      let title = `**${author}** te sacaste un ${number} de un dado de ${sides} caras`
      msg.channel.send((new message.BaseMessage()).setTitle(title))
    }
  }),

  new CustomCommand({
    'name': 'f',
    'execute': (msg) => {
      let mensaje = getMessage(msg)
      let description = `**${state.author}** ha dado sus respetos por ${state.mensaje} <:sad:403381288188510210>`
      msg.channel.send((new message.BaseMessage()).setDescription(description))
    }
  }),

  new CustomCommand({
    'name': 'f',
    'cooldown': clients.cooldown({'seconds': 30}),
    'execute': (msg) => {
      var lado = 'sol'
      var url = 'https://i.imgur.com/3ECJb4T.gif'
      if (Math.round(Math.random()) === 1) {
        lado = 'aguila'
        url = 'https://i.imgur.com/VpcIiTD.gif'
      }
      let replyMessage = new message.BaseMessage()
      let title = `**${state.author}** te sacaste ${state.lado}`
      msg.channel.send(replyMessage.setTitle(title).setImageUrl(url))
    }
  })
  ]
}