function isEmpty(string) {
  return string === undefined || string.trim() === ''
}

function getAuthor(msg) {
  return msg.author.username
}

function getFirstMention(msg) {
  return msg.mentions.members.first().user.username
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

exports.isEmpty = isEmpty
exports.getAuthor = getAuthor
exports.getFirstMention = getFirstMention
exports.countMentions = countMentions
exports.hasMention = hasMention
exports.getRandom = getRandom
exports.getMessage = getMessage
