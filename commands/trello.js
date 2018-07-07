const Command = require('../core/command.js').Command
const message = require('../core/message.js')
const utils = require('../core/utils.js')

class DevCommand extends Command {
  constructor(name, clients) {
    super(name)
    this.trello = clients.trello
  }

  execute(msg) {
    let content = utils.getMessage(msg)
    if(utils.isEmpty(content)) {
        msg.channel.send('Tienes que darnos un mensaje, pendejo')
    } else {
      let ts = new Date().toISOString();
      let sugestion = `@${msg.author.username}(${msg.author.id})[${ts}]`
      let boardId = "5b27dfc25561a398e3c26e3e"
      this.trello.addCard(sugestion, content, boardId).then( (x) => {} )
      let replyMessage = new message.BaseMessage()
      replyMessage.setTitle('Gracias, lo tomaremos en cuenta')
      msg.channel.send(replyMessage)
    }
  }
}

exports.getCommands = (clients) => [new DevCommand('dev', clients)]