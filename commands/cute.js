const Command = require('../core/command.js').Command
const message = require('../core/message.js')

class CuteCommand extends Command {
  constructor(params) {
    super(params)
    this.types = params.clients.config.types
    this.cuteapi = params.clients.cuteapi
  }

  execute(msg) {
    let types = this.types
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
}

exports.getCommands = (clients) => [new CuteCommand({'name': 'c', 'clients': clients})]