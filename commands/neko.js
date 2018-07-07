// Neko commands

const Command = require('../core/command.js').MentionImageTitleCommand

let nekoCommand = (name, image, title) => {
  let params = {'name': name, 'image': image, 'title': title}
  return new Command(params)
}

exports.getCommands = (clients) => {
  let neko = clients.neko
  let messages = clients.config.neko.messages
  return [
    nekoCommand('pat',     neko.getSFWPat,        messages.pat),
    nekoCommand('kiss',    neko.getSFWKiss,       messages.kiss),
    nekoCommand('slap',    neko.getSFWSlap,       messages.slap),
    nekoCommand('hug',     neko.getSFWHug,        messages.hug),
    nekoCommand('poke',    neko.getSFWPoke,       messages.poke),
    nekoCommand('feed',    neko.getSFWFeed,       messages.feed),
    nekoCommand('cuddle',  neko.getSFWCuddle,     messages.hug),
    nekoCommand('meaw',    neko.getSFWNeko,       messages.meaw),
    nekoCommand('tickle',  neko.getSFWTickle,     messages.tickle),
    nekoCommand('lizzard', neko.getSFWLizard,     messages.lizzard),
    nekoCommand('foxgirl', neko.getSFWFoxGirl,    messages.foxgirl),
    nekoCommand('nekogif', neko.getSFWNekogif,    messages.nekogif),
    nekoCommand('kemono',  neko.getSFWKemonomimi, messages.kemono),
    nekoCommand('holo',    neko.getSFWHolo,       messages.holo)
  ]
}