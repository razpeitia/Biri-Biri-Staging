const footer = ['© FAMFAMO ~ ', 'https://cdn.discordapp.com/emojis/411791637870542851.png']
const color = 0xff0000

class BaseMessage extends Discord.RichEmbed {
  costructor() {
    super()
    this.setColor(color)
    this.setFooter(...footer)
  }
}

exports.BaseMessage = BaseMessage