const Collection = require('discord.js/src/util/Collection')

class MessageTest {
  constructor (content, nsfw) {
    this._messageSent = []
    this.content = content
    this.channel = {
      'type': 'text',
      'name': 'someChannel',
      'nswf': nsfw || false,
      'send': (m) => {
        this._messageSent.push(m)
      }
    }
    this.author = this.makeUser('someUsername')
    this.mentions = { 'members': new Collection() }
  }

  addMention(username, id) {
    let mention = this.makeMention(username, id)
    this.mentions.members.set(mention.id, mention)
    return this
  }

  makeUser(username, bot, id) {
    return {
      'id': id || 123,
      'name': username,
      'username': username,
      'bot': bot || false
    }
  }

  makeMention(username, id) {
    return {
      'user': this.makeUser(username, false, id)
    }
  }
}

exports.MessageTest = MessageTest