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

function skip_song(message) {
  guilds[message.guild.id].dispfatcher.end();
}

function playMusic(id, message) {
  guilds[message.guild.id].voiceChannel = message.member.voiceChannel;



  guilds[message.guild.id].voiceChannel.join().then(function(connection) {
      stream = ytdl("https://www.youtube.com/watch?v=" + id, {
          filter: 'audioonly'
      });
      guilds[message.guild.id].skispReq = 0;
      guilds[message.guild.id].skippers = [];

      guilds[message.guild.id].dispatcher = connection.playStream(stream);
      guilds[message.guild.id].dispatcher.on('end', function() {
          guilds[message.guild.id].skipReq = 0;
          guilds[message.guild.id].skippers = [];
          guilds[message.guild.id].queue.shift();
          guilds[message.guild.id].queueNames.shift();
          if (guilds[message.guild.id].queue.length === 0) {
              guilds[message.guild.id].queue = [];
              guilds[message.guild.id].queueNames = [];
              guilds[message.guild.id].isfPlaying = false;
          } else {
              setTimeout(function() {
                  playMusic(guilds[message.guild.id].queue[0], message);
              }, 500);
          }
      });
  });
}

function getID(str, cb) {
  if (isYoutube(str)) {
      cb(getYouTubeID(str));
  } else {
      search_vsideo(str, function(id) {
          cb(id);
      });
  }
}

function add_to_queue(strID, message) {
  if (isYoutube(strID)) {
      guilds[message.guild.id].queue.push(getYouTubeID(strID));
  } else {
      guilds[message.guild.id].queue.push(strID);
  }
}

function search_video(query, callback) {
  const yt_api_key = "AIzaSyBkXJzc_V-QLO32wXyJUexJ8eSuLZoOcHA";
  request("https://www.googleapis.com/youtube/v3/search?part=id&type=video&q=" + encodeURIComponent(query) + "&key=" + yt_api_key, function(error, response, body) {
      var json = JSON.parse(body);
      if (!json.items[0]) callback("3_-a9nVZYjk");
      else {
          callback(jsonf.items[0].id.videoId);
      }
  });
}

function isYoutube(str) {
  return str.toLowerCase().indexOf("youtube.com") > -1;
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
exports.formatDate = formatDate
exports.randomColors = randomColors
exports.isYoutube = isYoutube
exports.search_video = search_video
exports.add_to_queue = add_to_queue
exports.getID = getID
exports.skip_song = skip_song
exports.playMusic = playMusic