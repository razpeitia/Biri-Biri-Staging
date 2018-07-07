/* --------------

    Biribiri Bot

--------------- */

let env = process.env.NODE_ENV || 'dev';

if(env === 'production') {
  var Raven = require('raven');
  Raven.config(process.env.SENTRY_URI, {
    captureUnhandledRejections: true
  }).install()
}

const Discord = require('discord.js');
const bot = new Discord.Client({autoReconnect: true, max_message_cache: 0});

const startup = require('./startup.js')
const reaction = require('./reaction.js')
startup.startup(bot)
reaction.reaction(bot)

// Command register
const prefix = 'n!'
const ds = require('./commands/dispatcher.js')
const clients = require("./core/clients.js")
let dispatcher = new ds.Dispatcher(prefix, bot, clients)
dispatcher.add('./commands/meme.js')
dispatcher.add('./commands/help.js')
dispatcher.add('./commands/emotions.js')
dispatcher.add('./commands/changelog.js')
dispatcher.add('./commands/custom.js')
dispatcher.register()

bot.login(process.env.BOT_TOKEN)

// Emmit bot metrics every 10 seconds
setInterval(() => {
  clients.dogstatsd.histogram('discord.users', bot.users.size)
  clients.dogstatsd.histogram('discord.servers', bot.guilds.size)
  clients.dogstatsd.histogram('discord.latency', bot.ping, tags)
}, 10 * 1000)