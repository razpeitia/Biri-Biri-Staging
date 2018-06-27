const emotions = require('../emotions.js')

const models = require('./support/models.js')
const MessageTest = models.MessageTest

const utils = require('./support/utils.js')
const expectExec = (msg, commands) => {
  let dispatch = emotions.dispatchTest
  let execute = emotions.executeTest
  utils.expectExec(msg, commands, dispatch, execute)
}
const expectTitleImage = utils.expectTitleImage
const makeFakeClients = utils.makeFakeClients

describe('Emotion commands', () => {
  let commands = emotions.commands(makeFakeClients())

  it('Should run dab', () => {
    spyOn(Math, 'random').and.returnValue(0)
    let msg = new MessageTest('n!dab', ((message, msg) => {
      expectTitleImage(msg,
        '#DabIsDead',
        'https://cdn.weeb.sh/images/S1TQsg1c-.jpeg')
    }))
    expectExec(msg, commands)
  })

  let flipTest = (expectedValue) => {
    return () => {
      let randomValue = expectedValue === 'aguila' ? 1.0 : 0.0
      let expectedImage = expectedValue === 'aguila' ? 'https://i.imgur.com/VpcIiTD.gif' : 'https://i.imgur.com/3ECJb4T.gif'
      spyOn(Math, 'random').and.returnValue(randomValue)
      let msg = new MessageTest('n!flip', ((message, msg) => {
        let expectedTitle = `**${message.author.name}** te sacaste ${expectedValue}`
        expectTitleImage(msg, expectedTitle, expectedImage)
      }))
      expectExec(msg, commands)
    }
  }
  it('Should run flip (aguila)', flipTest('aguila'))
  it('Should run flip (sol)', flipTest('sol'))

  it('Should pat a mention', () => {
    let handler = (message, msg) => {
      let expectedMention = message.mentions.members.first().user.username
      let expectedAuthor = message.author.username
      expectTitleImage(msg,
        `**${expectedMention}** *recibiste un pat de* **${expectedAuthor}**`,
        'https://example.com/pat.png')
    }
    let msg = new MessageTest('n!pat', handler)
    msg.addMention('someMention', 321)
    expectExec(msg, commands)
  })

  it('Should kiss', () => {
    let handler = (message, msg) => {
      expectTitleImage(msg,
        'Usted a recibido un(a) kiss',
        'https://cuteapi/kiss.png')
    }
    let msg = new MessageTest('n!c kiss', handler)
    expectExec(msg, commands)
  })
})