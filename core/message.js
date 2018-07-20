const Discord = require('discord.js')
const utils = require('../core/utils.js')

const color = 0x2e2538;

class BaseMessage extends Discord.RichEmbed {
  constructor() {
    super()
    this.setColor(color)
    this.setFooter(`© ${msg.guild.name} ~ `, 'https://cdn.discordapp.com/emojis/411791637870542851.png')
  }
}

exports.BaseMessage = BaseMessage