exports.reaction = function(bot) {
  const config = require("./config_commands.json");

  function hasSomeWords(keywords, string) {
    let uniqueWords = new Set(string.toLowerCase().split(/\s+/));
    return keywords.filter(kw => uniqueWords.has(kw)).length > 0;
  }

  class Reaction {
    constructor(r, msg) {
      if(r.message instanceof Array) {
        this.isValid = () => {
          return hasSomeWords(r.message, msg.content);
        };
      }
      else if(typeof r.message === "string") {
        this.isValid = () => {
          return msg.content.toLowerCase() === r.message;
        };
      }
      else {
        console.log(`Tipo indefinido ${r.message}`);
      }

      if(r.send !== undefined) {
        this.action = () => { msg.channel.send(r.send) };
      }
      else if(r.react !== undefined) {
        this.action = () => { msg.react(r.react) };
      }
      else {
        console.log("Una action es requira, ya sea react o send")
      }

    }
  };

  bot.on('message', msg => {
    config.reactions
    .map(r => { return new Reaction(r, msg); })
    .filter(r => { return r.isValid(); })
    .forEach(r => { r.action(); });
  });

};