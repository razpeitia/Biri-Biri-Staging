exports.reaction = function(bot){

var umiyadosList = ['chale', 'umiyaron', 'umiyado'];

function hasSomeWords(keywords, string) {
    let uniqueWords = new Set(string.toLowerCase().split(/\s+/));
    return keywords.filter(kw => uniqueWords.has(kw)).length > 0;
}

bot.on('message', msg => {
    if (msg.content.toLowerCase() === 'mamey') {
      msg.channel.send('coman mamey <:pacman:420980551105642516>');
    }
    if (msg.content === '<:pacman:420980551105642516>') {
    	msg.react("420980551105642516");
    }
    if (msg.content === '<:wanwan:403968696067948554>'){
    	msg.react("403968696067948554");
    }
    if (msg.content === '<:ban:403065152863469579>'){
    	msg.react("403065152863469579");
    }
    if (msg.content === '<:justmonika:410847146984734720>'){
    	msg.react("410847146984734720");
    }
    if (msg.content === '<:vohiyo:412474913883160577>'){
    	msg.react("412474913883160577");
    }
    if (msg.content === '<a:truleado:415551980719702016>'){
    	msg.react("415551980719702016");
    }
    if (msg.content.toLowerCase() === 'cuack') {
    	msg.react("🦆");
    }
    if (msg.content === 'succ'){
    	msg.react("419006807147675679");
    }
     if (msg.content === 'fastsucc'){
    	msg.react("419006860062883843");
    }
    if (hasSomeWords(umiyadosList, msg.content)) {
      msg.react("415551980719702016");
    }
  });
};