const emotions = require('../emotions.js')
const events = require('events');
const Collection = require('discord.js/src/util/Collection')
const config = require('../config_commands.json')

function makeUser(username, bot) {
  return {
    'id': 123,
    'name': username,
    'username': username,
    'bot': bot || false
  }
}

function makeMention(username) {
  return {
    'user': {
      'id': 321,
      'username': username
    }
  }
}

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
    this.author = makeUser('someUsername')
    let m = new Collection()
    if(mentions !== undefined)
      mentions.forEach((mention) => m.set(mention.id, mention))
    this.mentions = {
      'members': m
    }

  }
}

function makeFakeClients() {
  return {
    'neko': {
      'getSFWPat': () => ({'url': 'https://example.com/pat.png'})
    },
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

  it('Should pat a mention', () => {
    let handler = (message, msg) => {
      expectNotEmpty(msg.title)
      expect(msg.title).toBe('**someMention** *recibiste un pat de* **someUsername**')
      expectNotEmpty(msg.image.url)
      expectUrl(msg.image.url)
      expect(msg.image.url).toBe('https://example.com/pat.png')
    }
    let msg = new MessageTest('n!pat', handler, true, [makeMention('someMention')])
    execute(msg, commands)
  })
})