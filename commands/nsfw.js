// NSFW commands

const Command = require('../core/command.js').NSFWCommand

let nsfw = (name, imageFunc) => new NSFWCommand(name, imageFunc)

exports.getCommands = (clients) => {
  let neko = clients.neko

  return [
    nsfw('eron',        neko.getNSFWEroNeko),
    nsfw('holoero',     neko.getNSFWHoloEro),
    nsfw('patas',       neko.getSFWEroFeet),
    nsfw('loli',        neko.getNSFWSmallBoobs),
    nsfw('pussy',       neko.getNSFWPussyGif),
    nsfw('analart',     neko.getNSFWAnalArts),
    nsfw('lewdnekogif', neko.getNSFWNekoGif),
    nsfw('pussyart',    neko.getNSFWPussyArt),
    nsfw('pwankg',      neko.getNSFWPussyWankGif),
    nsfw('eroyuri',     neko.getNSFWEroYuri),
    nsfw('erokemo',     neko.getNSFWEroKemonomimi),
    nsfw('blowjob',     neko.getNSFWBlowJob),
    nsfw('trap',        neko.getNSFWTrap),
    nsfw('tits',        neko.getNSFWTits),
    nsfw('solo',        neko.getNSFWGirlSolo),
    nsfw('solog',       neko.getNSFWGirlSoloGif),
    nsfw('anal',        neko.getNSFWAnal),
    nsfw('kuni',        neko.getNSFWKuni),
    nsfw('random',      neko.getNSFWRandomHentaiGif),
    nsfw('lewdkemo',    neko.getNSFWKemonomimi),
    nsfw('feet',        neko.getNSFWFeet),
    nsfw('ero',         neko.getNSFWEro),
    nsfw('cumart',      neko.getNSFWCumArts),
    nsfw('cum',         neko.getNSFWCumsluts),
    nsfw('classic',     neko.getNSFWClassic),
    nsfw('pussy',       neko.getNSFWPussy),
    nsfw('futanari',    neko.getNSFWFutanari),
    nsfw('boobs',       neko.getNSFWBoobs),
    nsfw('keta',        neko.getNSFWKeTa),
    nsfw('bj',          neko.getNSFWBj),
    nsfw('erok',        neko.getNSFWEroKitsune),
    nsfw('hololewd',    neko.getNSFWHolo),
    nsfw('yuri',        neko.getNSFWYuri),
    nsfw('feetgif',     neko.getNSFWFeetGif),
    nsfw('lewdk',       neko.getNSFWKitsune),
    nsfw('lewd',        neko.getNSFWNeko),
    nsfw('femdom',      neko.getNSFWFemdom),
    nsfw('hentai',      neko.getNSFWHentai),
    nsfw('les',         neko.getNSFWLesbian)
  ]
}