const message = require('./message.js')

function isEmpty(string) {
  return string === undefined || string === null || string.trim() === ''
}

function getAuthor(msg) {
  return msg.author.username
}

function getFirstMention(msg) {
  return msg.mentions.members.first().user.username
}

function isFirstMentionAuthor(msg) {
  return msg.author.id === msg.mentions.members.first().user.id
}

function countMentions(msg) {
  return msg.mentions.members.size
}

function hasMention (msg) {
  return countMentions(msg) > 0
}

function getRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}


function getMessage(msg) {
  let arr = msg.content.trim().split(' ')
  arr.shift()
  return arr.join(' ')
}

function sendText(msg, text) {
  let reply = new message.BaseMessage()
  reply.setTitle(text)
  msg.channel.send(reply)
}

function getContent(content) {
  if(content === undefined) return undefined
  if((typeof content) === 'string') return content
  if(content instanceof Function) return (async () => await content())()
  if(Array.isArray(content)) return getRandom(content)
}

exports.isEmpty = isEmpty
exports.getAuthor = getAuthor
exports.getFirstMention = getFirstMention
exports.countMentions = countMentions
exports.hasMention = hasMention
exports.getRandom = getRandom
exports.getMessage = getMessage
exports.sendText = sendText
exports.isFirstMentionAuthor = isFirstMentionAuthor
exports.getContent = getContent