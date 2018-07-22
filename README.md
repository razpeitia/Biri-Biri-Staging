# Biri-Biri-Staging
Discord Bot for FAMFAMO! 

*Developed by:
`Taeko#0001` & `Rare Akuma ☆#4034`*

Notes:
This is a custom bot for discord, is not recommendable use in a new Guild, this might not work if you doesn't know what are you doing! 

## Setup - Instalacion

* `git clone https://github.com/LucasBares/Biri-Biri-Staging.git`
* `cd Biri-Biri-Staging`
* `npm install --save`

## How to Run the Bot 

* `npm start`

* Things you must change:
  * Token of conection
  * Every if with the channel.id = " # "
  
## Enviroment Variables

### OPEN_WEATHER_KEY

Open weather key you can obtain your key here: 
https://openweathermap.org/appid


### RIOT_API_KEY

If you want to enable riot support you need an api key.
You can obtain your key here:
https://developer.riotgames.com/getting-started.html

### CUTE_TOKEN

To enable cute command support you must get a api key
https://cute-api.tk/


### TRELLO_KEY & TRELLO_TOKEN

To enable trello support you must get a trello key and token
Also you need to change the board id in the code.
Or make it configurable and submit a PR :)

### DATABASE_URL

This is the database where we save some command, channel, user information 
to check if we have to enable or disable a command.

We expect the following format:
postgresql://user:password@hostname:port/dbname


### RECLAMO_DATABASE_URL

This is the reclamo database, we store waifus, persons and their relationship.

We expect the following format:
postgresql://user:password@hostname:port/dbname

### BOT_TOKEN

Discord bot token, create a new application here
https://discordapp.com/developers/applications/

Enter to your new application and then in the `bot` section get the token.

### NODE_ENV

If not set, `dev` is set by default.
Only useful to enable sentry support.


### SENTRY_URI

You have to register in this site to get an api key
https://sentry.io/signup/
  
  
 Special thanks to:
 
`Hiro-Inu, razpeitia#5174 - And everyone who apports to the bot via discord.`
 
