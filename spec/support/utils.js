const config = require('../../config_commands.json')

function expectNotEmpty (value) {
  expect(value !== undefined).toBeTruthy()
  expect(value !== '').toBeTruthy()
}
exports.expectNotEmpty = expectNotEmpty

function expectUrl(value) {
  expect(/^https?:\/\/.*$/.test(value)).toBeTruthy()
}
exports.expectUrl = expectUrl

exports.expectTitleImage = (msg, expectedTitle, expectedImage) => {
  expectNotEmpty(msg.title)
  expect(msg.title).toBe(expectedTitle)
  expectNotEmpty(msg.image.url)
  expectUrl(msg.image.url)
  expect(msg.image.url).toBe(expectedImage)
}

exports.expectExec = (msg, commands, dispatch, execute) => {
  let responseCommands = dispatch(msg, commands)
  expect(responseCommands.length).toBe(1)
  execute(msg, responseCommands)
}

exports.makeFakeClients = () => {
  return {
    'neko': {
      'getSFWPat': () => ({'url': 'https://example.com/pat.png'})
    },
    // FIXME; Don't use actual config
    'config': config,
    'cooldown': (_) => undefined,
    'cuteapi': {
      'getJSON': (type, nsfw) => ({'url': `https://cuteapi/${type}.png`})
    }
  }
}