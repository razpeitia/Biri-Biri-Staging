const emotions = require('../emotions.js')
const events = require('events');
const Collection = require('discord.js/src/util/Collection')
const config = require('../config_commands.json')

class MessageTest {
  constructor (content, handler, nsfw, mentions) {
    this.content = content
    this.channel = {
      'type': 'text',
      'name': 'someChannel',
      'nswf': nsfw || false,
      'send': (msg) => {
        handler(this, msg)
      }
    }
    this.author = {
      'name': 'someUsername',
      'username': 'someUsername',
      'bot': false
    }
    this.mentions = {
      'members': new Collection(mentions || [])
    }
    this.wasMessageSent = false
  }
}

function makeFakeClients() {
  return {
    'neko': {},
    // FIXME; Don't use actual config
    'config': config,
    'cooldown': (_) => undefined
  }
}

let makeCommands = () => emotions.commands(makeFakeClients())

function expectNotEmpty(value) {
  expect(value !== undefined).toBeTruthy()
  expect(value !== '').toBeTruthy()
}

function expectUrl(value) {
  expect(/^https?:\/\/.*$/.test(value)).toBeTruthy()
}

function execute(msg, commands) {
  let responseCommands = emotions.dispatchTest(msg, commands)
  expect(responseCommands.length).toBe(1)
  emotions.executeTest(msg, responseCommands)
}

describe('Dab command', () => {
  let commands = makeCommands()
  it('Should run dab', () => {
    let msg = new MessageTest('n!dab', ((message, msg) => {
      expectNotEmpty(msg.title)
      expectNotEmpty(msg.image.url)
      expectUrl(msg.image.url)
    }))
    execute(msg, commands)
  })

  let flipTest = (expectedValue) => {
    return () => {
      let randomValue = expectedValue === 'aguila' ? 1.0 : 0.0
      spyOn(Math, 'random').and.returnValue(randomValue)
      let msg = new MessageTest('n!flip', ((message, msg) => {
        expectNotEmpty(msg.title)
        expect(msg.title).toBe(`**${message.author.name}** te sacaste ${expectedValue}`)
        expectNotEmpty(msg.image.url)
        expectUrl(msg.image.url)
      }))
      execute(msg, commands)
    }
  }
  it('Should run flip (aguila)', flipTest('aguila'))
  it('Should run flip (sol)', flipTest('sol'))
})