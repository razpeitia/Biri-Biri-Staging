exports.meme = function (bot){


var schedule = require('node-schedule');
var Cooldown = require('cooldown');

var cd = new Cooldown(25000);
var memeCommands = ['n!meme'];

bot.on('message', msg => {
  if (memeCommands.some((v) => msg.content.toLowerCase().includes(v) )) {
  if(msg.content.indexOf(memeCommands) !== 0) return;
    if (cd.fire()) {
      var mentioned = msg.mentions.users.first();
      if (!mentioned) return msg.channel.send("Te falto etiquitar a la gente, pendejo [n!meme @alguien]")
      var mAvatarURL = mentioned.displayAvatarURL;
      var pic = mAvatarURL.replace(".png?size=2048", ".png");
      var chop = msg.content.split('>');
      var pichula = chop[1].split('|');
      console.log("Meme generated for",mentioned['username']);
      msg.channel.send({files: [memeCreator(pichula[0],pichula[1],pic)]});
    } else {
      msg.channel.send('esperate pendejo');
      }
  }
});

function memeCreator(top, bottom, pic){
    top = top || "";
    bottom = bottom || "";
  return "https://memegen.link/custom/"+encodeURI(top)+"/"+encodeURI(bottom)+".jpg?alt="+pic;
}

async function f1() {
  var x = await memeCreator(10);
}
f1();


};

exports.getCommands = (clients) => {
  return []
}