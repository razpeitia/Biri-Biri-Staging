const Discord = require('discord.js')
const utils = require('../core/utils.js')

const footer = [`© ${msg.guild.name} ~ `, 'https://cdn.discordapp.com/emojis/411791637870542851.png']
const color = utils.randomColors();

class BaseMessage extends Discord.RichEmbed {
  constructor() {
    super()
    this.setColor(color)
    this.setFooter(...footer)
  }
}

exports.BaseMessage = BaseMessage