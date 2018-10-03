const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')
const utils = require('../core/utils.js')
const sprintf = require('sprintf-js').sprintf

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'c',
    'execute': async (msg) => {
      utils.startTyping()
      let author = msg.author.username
      let cuteapi = clients.cuteapi
      let types = clients.config.cuteapi.types

      let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1]
      var type = types.find((cuteType) => { return cuteType.name === maybeType })
      if(type === undefined) type = utils.getRandom(types)
      let title = sprintf(type.title, {'author': author})
      let imgUrl = (await cuteapi.getJSON(type.name, false)).url

      let replyMessage = new message.BaseMessage(msg)
      replyMessage.setTitle(title)
      replyMessage.setImage(imgUrl)
      msg.channel.send(replyMessage)
      utils.stopTyping()
    }
  })]
}