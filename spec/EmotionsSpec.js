const emotions = require('../emotions.js')
const events = require('events');
const Collection = require('discord.js/src/util/Collection')

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

function expectNotEmpty(value) {
  expect(value !== undefined).toBeTruthy()
  expect(value !== '').toBeTruthy()
}

function expectUrl(value) {
  expect(/^https?:\/\/.*$/.test(value)).toBeTruthy()
}

function execute(msg) {
  let commands = emotions.dispatchTest(msg)
  expect(commands.length).toBe(1)
  emotions.executeTest(msg, commands)
}

describe('Dab command', () => {
  it('Should run dab', () => {
    let msg = new MessageTest('n!dab', ((message, msg) => {
      expectNotEmpty(msg.title)
      expectNotEmpty(msg.image.url)
      expectUrl(msg.image.url)
    }))
    execute(msg)
  })
})

describe('Flip command', () => {
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
      execute(msg)
    }
  }
  it('Should run flip (aguila)', flipTest('aguila'))
  it('Should run flip (sol)', flipTest('sol'))
})