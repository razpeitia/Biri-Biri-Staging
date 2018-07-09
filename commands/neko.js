// Neko commands

const Command = require('../core/command.js').MentionImageTitleCommand

let nekoCommand = (name, image, title) => {
  let params = {'name': name, 'image': image, 'title': title}
  return new Command(params)
}

function asycNeko(nekoFunc) {
  return (async () => {
    return (await nekoFunc()).url
  })
}

exports.getCommands = (clients) => {
  let neko = clients.neko
  let messages = clients.config.neko.messages
  return [
    nekoCommand('pat',     asycNeko(neko.getSFWPat),        messages.pat),
    nekoCommand('kiss',    asycNeko(neko.getSFWKiss),       messages.kiss),
    nekoCommand('slap',    asycNeko(neko.getSFWSlap),       messages.slap),
    nekoCommand('hug',     asycNeko(neko.getSFWHug),        messages.hug),
    nekoCommand('poke',    asycNeko(neko.getSFWPoke),       messages.poke),
    nekoCommand('feed',    asycNeko(neko.getSFWFeed),       messages.feed),
    nekoCommand('cuddle',  asycNeko(neko.getSFWCuddle),     messages.hug),
    nekoCommand('meaw',    asycNeko(neko.getSFWNeko),       messages.meaw),
    nekoCommand('tickle',  asycNeko(neko.getSFWTickle),     messages.tickle),
    nekoCommand('lizzard', asycNeko(neko.getSFWLizard),     messages.lizzard),
    nekoCommand('foxgirl', asycNeko(neko.getSFWFoxGirl),    messages.foxgirl),
    nekoCommand('nekogif', asycNeko(neko.getSFWNekogif),    messages.nekogif),
    nekoCommand('kemono',  asycNeko(neko.getSFWKemonomimi), messages.kemono),
    nekoCommand('holo',    asycNeko(neko.getSFWHolo),       messages.holo)
  ]
}