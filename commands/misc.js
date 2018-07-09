const commands = require('../core/command.js')
const message = require('../core/message.js')
const utils = require('../core/utils.js')
const CustomCommand = commands.CustomCommand
const ImageTitleCommand = commands.ImageTitleCommand
const MentionImageTitleCommand = commands.MentionImageTitleCommand

exports.getCommands = (clients) => {
  let config = clients.config
  return [
    new ImageTitleCommand({
      'name': 'dab',
      'image': config.dab.images,
      'title': config.dab.texts
    }),

    new ImageTitleCommand({
      'name': 'wag',
      'image': config.wag.images
    }),

    new MentionImageTitleCommand({
      'name': 'culear',
      'alias': ['culiar','culiada'],
      'selfError': 'No te puedes culear a ti mismo, pendejo!',
      'image': config.culear.images,
      'title': config.culear.texts
    }),

    new MentionImageTitleCommand({
      'name': 'putear',
      'alias': ['putiar','putiza'],
      'selfError': 'No te puedes putear a ti mismo, pendejo',
      'image': config.putear.images,
      'title': config.putear.texts
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
        let title = latency + ' ms'
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
          let restMessage = utils.getMessage(msg)
          let calculado = Math.floor(Math.random() * 101)
          let title = `La puntuacion de **${restMessage}** es de **${calculado}**/100`
          replyMessage.setTitle(title)
        } else {
          replyMessage.setTitle('Se debe meter algo a alguien para ratear, pendejo')
        }
        msg.channel.send(replyMessage)
      }
    }),

    new CustomCommand({
      'name': 'avatar',
      'execute': (msg) => {
        var avatar
        if(utils.hasMention(msg))
          avatar = msg.mentions.members.first().user.avatarURL
        else
          avatar = msg.author.avatarURL
        if(utils.isEmpty(avatar)) {
          msg.channel.send(new message.BaseMessage().setTitle('Usuario sin avatar'))
        } else {
          msg.channel.send(new message.BaseMessage().setImage(avatar))
        }
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
      'title': '<:webos:450520773652905984>',
      'image': async () => {
        let params = {
          'url': 'https://dog.ceo/api/breeds/image/random',
          'json': true
        }
        let response = await clients.request(params)
        return response.message
      }
    }),

    new CustomCommand({
      'name': 'roll',
      'execute': (msg) => {
        let maybeNumber = msg.content.trim().split(/\s+/)[1]
        let sides = /^\d{1,3}$/.test(maybeNumber) ? Number.parseInt(maybeNumber) : 6
        let randomNumber = Math.floor(Math.random() * sides) + 1
        let author = utils.getAuthor(msg)
        let title = `**${author}** te sacaste un ${randomNumber} de un dado de ${sides} caras`
        msg.channel.send((new message.BaseMessage()).setTitle(title))
      }
    }),

    new CustomCommand({
      'name': 'f',
      'execute': (msg) => {
        let mensaje = utils.getMessage(msg)
        let author = utils.getAuthor(msg)
        let description = `**${author}** ha dado sus respetos por ${mensaje} <:sad:403381288188510210>`
        msg.channel.send((new message.BaseMessage()).setDescription(description))
      }
    }),

    new CustomCommand({
      'name': 'flip',
      'cooldown': clients.cooldown({'seconds': 30}),
      'execute': (msg) => {
        let author = utils.getAuthor(msg)
        var lado = 'sol'
        var url = 'https://i.imgur.com/3ECJb4T.gif'
        if (Math.round(Math.random()) === 1) {
          lado = 'aguila'
          url = 'https://i.imgur.com/VpcIiTD.gif'
        }
        let replyMessage = new message.BaseMessage()
        let title = `**${author}** te sacaste ${lado}`
        msg.channel.send(replyMessage.setTitle(title).setImage(url))
      }
    })
  ]
}