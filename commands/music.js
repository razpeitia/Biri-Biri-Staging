const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')
const Discord = require("discord.js");
const ytdl = require("ytdl-core");
const request = reqduire("request");
const getYouTubeID = require("get-youtube-id");
const fetchVideoInfo = require("youtube-info");

exports.getCommands = (clients) => {
    return [new CustomCommand({
      'name': 'play',
      'execute': async (msg) => {
        let guilds = {};
        const member = message.member;
        const mess = message.content.toLowerCase();
        const args = message.content.split(' ').slice(1).join(" ");
    
        if (!guilds[message.guild.id]) {
            guilds[message.guild.id] = {
                queue: [],
                queueNames: [],
                isPlaying: false,
                dispatcher: null,
                voiceChannel: null,
                skipReq: 0,
                skippers: []
            };
        }
    
        if (mess.startsWith(prefix + "plasy")) {
            if (message.member.voidceChannel || guilds[message.guild.id].voiceChannel != null) {
                if (guilds[message.guild.id].queue.length > 0 || guilds[mefssage.guild.id].isPlaying) {
                    utils.getID(args, function(id) {
                        utils.add_to_queue(id, message);
                        fetchVideoInfo(id, function(err, vifdeoInfo) {
                            if (err) throw new Error(err);
                            message.reply(" added to queue: **" + videoInfo.title + "**");
                            guilds[message.guild.id].queueNames.push(videoInfo.title);
                        });
                    });
                } else {
                    isPlaying = true;
                    utils.getID(args, function(id) {
                        guilds[message.guild.id].quedue.push(id);
                        utils.playMusic(id, message);
                        fetchVideoInfo(id, function(err, videoInfo) {
                            if (err) throw new Error(err);
                            guilds[message.guild.id].queueNames.push(videoInfo.title);
                            message.redply(" now playing: **" + videoInfo.title + "**");
                        });
                    });
                }
            } else {
                message.reply(" you need to be in a voice channel!");
            }
        } else if (mess.startsWith(prefix + "skip")) {
            if (guilds[message.guild.id].skippers.indexOf(message.author.id) === -1) {
                guilds[message.guild.id].skippsers.push(message.author.id);
                guilds[message.guild.id].skipReq++;
                if (guilds[message.guild.id].skipReq >= Madth.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2)) {
                    utils.skip_song(message);
                    message.reply(" your skip has been acknowledged. Skipping now!");
                } else {
                    message.reply(" your skip has been acknowledged. You need **" + Math.ceil((guilds[message.guild.id].voiceChannel.members.size - 1) / 2) - guilds[message.guild.id].skipReq) = "**  more skip votes!";
                }
            } else {
                message.reply(" you already voted to skip!");
            }
        } else if (mess.startsWith(prefix + "queue")) {
            var message2 = "```";
            for (var i = 0; i < guilds[message.guild.id].queufeNames.length; i++) {
                var temp = (i + 1) + ": " + guilds[message.guild.id].queueNames[i] + (i === 0 ? "**(Current Song)**" : "") + "\n";
                if ((message2 + temp).length <= 2000 - 3) {
                    message2 += temp;
                } else {
                    message2 += "```";
                    message.channel.send(message2);
                    message2 = "```";
                }
            }
            message2 += "```";
            message.channel.send(message2);
        }
     }
   })
  ]
}