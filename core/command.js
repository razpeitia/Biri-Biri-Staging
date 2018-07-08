const utils = require('./utils.js')
const message = require('./message.js')
const sprintf = require('sprintf-js').sprintf

class Command {
  constructor(params) {
    this.name = params.name
    this.alias = params.alias || []
    this.cooldown = params.cooldown
    this.nsfw = params.nsfw || false
    this.mentions = params.mentions
    this.enable = true
    this.prefix = ''
  }

  setPrefix(prefix) {
    this.prefix = prefix
  }

  getFullName() {
    return this.prefix + this.name
  }

  getFullAlias() {
    let prefix = this.prefix
    return this.alias.map(a => prefix + a)
  }

  disable() { this.enable = false }

  enable() { this.enable = true }

  isEnable(msg) {
    // TODO: In the future we want more granular control
    // eg. check if it is enable for the author of this message
    return this.enable
  }

  onDisable(msg) {
    // Maybe you want to execute some action on this event
  }

  isPaused(msg) {
    if(this.cooldown === undefined) return false
    return this.cooldown.fire()
  }

  onPaused(msg) {
    // Maybe you want do to something in this case
  }

  isNSFW(msg) {
    // By default only get whatever is defined
    return this.nsfw
  }

  onNSFW(msg) {
    // Maybe you want to do something
    // if the command is NSFW but the channel not
  }

  areMentionsValid(msg) {
    if(this.mentions === undefined) return true
    return this.mentions === utils.countMentions(msg)
  }

  onInvalidMentions(msg) {

  }

  isSelfMention(msg) {
    if(this.mentions === undefined || this.mentions === 0) return false
    if(this.selfError === undefined) return false
    return utils.isFirstMentionAuthor(msg)
  }

  onSelfMention(msg) {

  }

  execute(msg) {
    throw new Error('You must implement this function')
  }
}

class ImageTitleCommand extends Command {
  constructor(params) {
    super(params)
    this.imageFunc = params.image
    this.titleFunc = params.title
  }

  dispatchTitle() {
    let title = this.title
    if(title === undefined) return
    if(title instanceof String) return title
    if(title instanceof Function) return title()
    if(Array.isArray(title)) return utils.getRandom(title)
  }

  execute(msg) {
    let author = utils.getAuthor(msg)
    let replyMessage = new message.BaseMessage()
    let imgUrl = this.imageFunc()
    let title = this.dispatchTitle()
    replyMessage.setImage(imgUrl)
    if(!utils.isEmpty(this.title)) {
      replyMessage.setTitle(sprintf(title, {'author': author}))
    }
    msg.channel.send(replyMessage)
  }
}

class MentionImageTitleCommand extends Command {
  constructor(params) {
    if(params.mentions === undefined) params.mentions = 1
    super(params)
    this.imageFunc = params.image
    this.title = params.title || ''
    this.selfError = params.selfError || 'Aber pendejo, no puedes hacer eso contigo mismo'
  }

  onSelfMention(msg) {
    utils.sendText(msg, this.selfError)
  }

  onInvalidMentions(msg) {
    var title
    if(this.mentions === 1) {
      title = 'Necesito solo una mencion, pendejo'
    } else if(this.mentions >= 2) {
      title = `Necesito exactamente {this.mentions} menciones, pendejo`
    } else {
      title = 'El dev cabron hizo algo mal reportalo'
    }
    utils.sendText(msg, title)
  }

  async execute(msg) {
    let mention = utils.getFirstMention(msg)
    let author = utils.getAuthor(msg)
    let replyMessage = new message.BaseMessage()
    let imgUrl = (await this.imageFunc()).url
    replyMessage.setImage(imgUrl)
    if(!utils.isEmpty(this.title)) {
      let title = sprintf(this.title, {'mention': mention, 'author': author})
      replyMessage.setTitle(title)
    }
    msg.channel.send(replyMessage)
  }
}

class NSFWCommand extends Command {
  constructor(params) {
    params.nsfw = true
    super(params)
    this.imageFunc = params.image
  }

  onNSFW(msg) {
    msg.channel.send("No seas marrano ese comando es NSFW")
  }

  async execute(msg) {
    let imgUrl = (await this.imageFunc()).url
    let replyMessage = new message.BaseMessage()
    msg.setImage(imgUrl)
    msg.channel.send(replyMessage)
  }
}

class RandomLocalImage extends ImageTitleCommand {
  constructor(params) {
    super(params)
    let images = params.images
    this.imageFunc = () => utils.getRandom(images)

    let titles = params.titles
    if(titles !== undefined) {
      this.titleFunc = () => utils.getRandom(titles)
    }

    this.selfError = params.selfError
  }

  execute(msg) {
    let author = utils.getAuthor(msg)
    if(this.selfError !== undefined && author === utils.getFirstMention(msg)) {
      let replyMessage = new message.BaseMessage()
      replyMessage.setTitle(this.selfError)
      msg.channel.send(replyMessage)
    } else {
      super.execute(msg)
    }
  }

}

class CustomCommand extends Command {
  constructor(params) {
    super(params)
    this.execute = params.execute
  }
}


exports.BaseCommand = Command
exports.ImageTitleCommand = ImageTitleCommand
exports.MentionImageTitleCommand = MentionImageTitleCommand
exports.NSFWCommand = NSFWCommand
exports.RandomLocalImage = RandomLocalImage
exports.CustomCommand = CustomCommand