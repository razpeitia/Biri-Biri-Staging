/* Maldicion 

const maldiciones = ['maldigo', 'maldito'];
bot.on('message', msg => {
  if (msg.author.id === maldicion.usr){
  	msg.react("419006807147675679");    // Maldicion de bardo con el succ
  	
  	if(msg.content.split(' ').some(p => maldiciones.indexOf(p.toLowerCase()) > -1)
  	    && msg.mentions.members.size > 0
  	    && Date.now() > maldicion.time + 1000*5){
  	
  	  const newUsr = msg.mentions.members.first().id;
  	  const newTime = Date.now();
  	  
  	  maldicion.usr = newUsr;
  	  maldicion.time = newTime;  	  
  	  /* Scheduler
  	   Si newUsr no se la pasa a alguien nuevo en 30 minutos
  	   se le regresa a Bardo.
  	  
  	  /* Hay que ver como arreglar esto, no pasa la maldicion
      curseReset.reschedule(new Date(Date.now() + 1000*60*30)); 
    }
  }
});*/

  /*Maldicion
  maldicion.usr = '257366759030390784';
  maldicion.time = Date.now();
  */
  //curseReset = schedule.scheduleJob('*/30 * * * *', function(){
  //maldicion.usr = bardo;
  //  maldicion.time = Date.now();
  //});