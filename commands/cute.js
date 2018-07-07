const CustomCommand = require('../core/command.js').CustomCommand
const message = require('../core/message.js')

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'c',
    'execute': (msg) => {
      let cuteapi = clients.cuteapi
      let types = clients.config.types
      let maybeType = msg.content.trim().toLowerCase().split(/\s+/)[1]
      let hasType = types.some((cuteType) => { return cuteType === maybeType })
      let type = hasType ? maybeType : types[Math.floor(Math.random() * types.length)]

      let title = `Usted a recibido un(a) ${type}`
      let imgUrl = this.cuteapi.getJSON(state.type, false).url

      let replyMessage = new message.BaseMessage()
      replyMessage.setTitle(title)
      replyMessage.setImageUrl(imgUrl)
      msg.channel.send(replyMessage)
    }
  })]
}