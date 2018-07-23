const cute = require('cuteapi')

const nekoClient = require("nekos.life")
const neko = new nekoClient()
const cuteapi = new cute(process.env.CUTE_TOKEN)

const Trello = require('trello')
const trello = new Trello(process.env.TRELLO_KEY, process.env.TRELLO_TOKEN)
var request = require('request-promise')

const StatsD = require('hot-shots')
const dogstatsd = new StatsD()

const config = require('../commands/config.json')

const Cooldown = require('cooldown')
const Pornsearch = require('pornsearch')
const stats = require('fire-emblem-heroes-stats');

function cooldown(params) {
  let ms = params.milliseconds || 0
  let seconds = params.seconds || 0
  let minutes = params.minutes || 0
  let hours = params.hours || 0
  let total = (1000 * ((hours * 3600) + (minutes * 60) + seconds)) + ms
  return new Cooldown(total)
}

exports.stats = stats
exports.trello = trello
exports.cuteapi = cuteapi
exports.neko = neko
exports.request = request
exports.config = config
exports.dogstatsd = dogstatsd
exports.cooldown = cooldown
exports.pornsearch = Pornsearch