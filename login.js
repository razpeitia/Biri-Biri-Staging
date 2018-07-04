/* --------------

    Biribiri Bot

--------------- */

var Raven = require('raven');
Raven.config(process.env.SENTRY_URI, {
  captureUnhandledRejections: true
}).install();

const Discord = require("discord.js");
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const startup = require("./startup.js");
const reaction = require("./reaction.js");
const meme = require("./meme.js");
const help = require("./help.js");
const emotions = require("./emotions.js");
const changelog = require("./changelog.js")
const clients = require("./clients.js")
const custom = require("./custom.js");

custom.custom(bot);
startup.startup(bot);
emotions.emotions(bot, emotions.commands(clients), clients);

help.help(bot);
meme.meme(bot);
reaction.reaction(bot);
changelog.changelog(bot);

bot.login(process.env.BOT_TOKEN);

// Emmit bot metrics every 10 seconds
setInterval(() => {
  clients.dogstatsd.histogram('discord.users', bot.users.size)
  clients.dogstatsd.histogram('discord.servers', bot.guilds.size)
}, 10 * 1000)