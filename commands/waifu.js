const CustomCommand = require('../core/command.js').CustomCommand
const utils = require('../core/utils.js')
const message = require('../core/message.js')
const db = require('../db/index.js').db

exports.getCommands = (clients) => {
  return [new CustomCommand({
    'name': 'waifu',
    'alias': ['husbando','w','h'],
    'execute': async (msg) => {
      let userId = msg.author.id

      let info = await db.getWaifu(userId)
      if(info === undefined) {
        msg.delete(3000);
        msg.reply("esa/e waifu/husbando no esta en el servidor, intenta nuevamente! \n Si quieres agregar un registo, intenta con `n!agregarwaifu`")
        return
      }

      let nombre = info.waifu
      let usuario = info.usuario
      let id = info.id

      let reply = new message.BaseMessage(msg)
      reply.setTitle("Datos de tu waifu!")
      reply.setDescription(`Waifu/Husbando : **${nombre}**`)
      reply.addField(`Numero: `,`**${id}**`)
      reply.addField(`Pertenece a`,`**<@${usuario}>**`)
      msg.channel.send(reply)
    }
  })
  ]
}
