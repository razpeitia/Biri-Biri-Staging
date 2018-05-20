/* --------------

    Negan Bot
  
--------------- */

const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const config = require("./config.json");
const startup = require("./startup.js");
const reaction = require("./reaction.js");
const meme = require("./meme.js");
const reclamo = require("./reclamo.js");
const roles = require("./roles.js");
const r34 = require("./r34.js");
const webos = require("./webos.js");
const help = require("./help.js");
const emotions = require("./emotions.js");

startup.startup(bot);
emotions.emotions(bot);
meme.meme(bot);
webos.webos(bot);
help.help(bot);
r34.r34(bot);
reaction.reaction(bot);
reclamo.reclamo(bot);
roles.roles(bot);

bot.login(config.token);
