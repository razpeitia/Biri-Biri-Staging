const message = require('./message.js')

function isEmpty(string) {
  return string === undefined || string === null || string.trim() === ''
}

function getAuthor(msg) {
  return msg.author.username
}

function getFirstMention(msg) {
  try { return msg.mentions.members.first().user.username; } catch(e) { return null; } 
}

function getFirstMentionID(msg) {
  try { return msg.mentions.members.first().user.id; } catch(e) { return null; } 
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

function randomColors() {
  let colors = [0x00ff80,0xc8b40a,0x2e2538,0x02e85f,0x1f4bdb];
  return color = getRandom(colors)
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

function formatDate(data) {
  var d = data,
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day,month,year].join('/')
}

exports.isEmpty = isEmpty
exports.getAuthor = getAuthor
exports.getFirstMention = getFirstMention
exports.getFirstMentionID = getFirstMentionID
exports.countMentions = countMentions
exports.hasMention = hasMention
exports.getRandom = getRandom
exports.getMessage = getMessage
exports.sendText = sendText
exports.isFirstMentionAuthor = isFirstMentionAuthor
exports.getContent = getContent
exports.formatDate = formatDate
exports.randomColors = randomColors
