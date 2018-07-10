const ds = require('../core/dispatcher.js')
const models = require('./support/models.js')
const MessageTest = models.MessageTest

const utils = require('./support/utils.js')
const fakeClients = utils.makeFakeClients
const prefix = 'n!'

describe('Emotion commands', () => {
  let clients = fakeClients()
  let dispatcher = new ds.Dispatcher(prefix, undefined, clients)
  dispatcher.add('../commands/neko.js')

  it('Must run pat', async () => {
    let msg = new MessageTest('n!pat')
    msg.addMention('userMention', 312)
    await dispatcher.dispatch(msg)

    expect(msg._messageSent.length).toBe(1)
    let reply = msg._messageSent[0]
    expect(reply.image.url).toBe(clients.neko.getSFWPat().url)
    expect(reply.title).toBe(clients.config.neko.messages.pat)
  })
})