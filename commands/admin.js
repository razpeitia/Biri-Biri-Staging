const commands = require('../core/command.js')
const send = require('../core/utils.js').sendText
const CustomCommand = commands.CustomCommand

exports.getCommands = (clients) => {
  return [
    new CustomCommand({
      'name': 'comando',
      'execute': (msg) => {
        let config = clients.config
        let isAdmin = config.admins.some(uid => uid === msg.author.id)
        if(!isAdmin) {
          return send(msg, 'Necesitas ser un admin, pendejo')
        }

        let maybeCommand = msg.content.trim().split(/\s+/)[1]
        if(maybeCommand === undefined) {
          return send(msg, 'Necesitas especificar un comando, pendejo')
        }
        if(maybeCommand === 'comando') {
          return send(msg, 'No <:wanwan:403968696067948554>')
        }

        let command = clients.dispatcher.getCommandByName(maybeCommand)
        let hasCommand = command !== undefined
        if(!hasCommand) {
          return send(msg, `Comando \`${maybeCommand}\` no encontrado`)
        }

        let maybeAction = msg.content.trim().split(/\s+/)[2]
        if(maybeAction !== 'activar' && maybeAction !== 'desactivar') {
          return send(msg, `Necesitas especificar una action 'activar' o 'desactivar', pendejo`)
        }
        let action = (maybeAction === 'activar') ? 'activado' : 'desactivado'
        action === 'activado' ? command.enable() : command.disable()
        return send(msg, `Comando ${command.name} ${action}`)
    }
    })
  ]
}
