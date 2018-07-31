# Biri-Biri-Staging
Discord Bot for FAMFAMO! 

*Developed by:
`Taeko#0001` & `Rare Akuma ☆#6776`*


## Features:
**Emotions:** 
* Cute-Api - Neko.js -  Custom emotions *Check misc.js for the list of custom emotions*
* Meme about a user avatar
* NSFW Commands (Images and Video Search)
* Ship Commands
* Choose between two items
* Await for User Messages and Do Something with that
* Trello for recommendations
* Mute per user
* Enable/Disable commands per channel
* Weather Asking
* Server and User Information
* League of Legends User Profile (Beta only LAS )
* Fire Emblem Heros Stats Checks (Beta)

## Setup

* `git clone https://github.com/LucasBares/Biri-Biri-Staging.git`
* `cd Biri-Biri-Staging`
* `npm install --save`

## How to Run the Bot 

* `node login.js`

* Things you must change:
  * Token of bot = *login.js* `bot.login("bot token here");`
  * Token of Cute Api = *clients.js* `const cuteapi = new cute("cuteapi token here");`
  * Token, Key and Board Id of Trello = *clients.js* `const trello = new Trello("trello key here", "trello token here")` - *trello.js* `let boardId = "board id here"`
  * Sentry Uri = *login.js* `Raven.config(sentry_URI,{.....`
  * Node Env = *login.js* `let env = node_env...`
  * Database and Reclamo URL = *index.js* `class Database { connectionString: "url of the database"`
  * Riot Api Key = *custom.js line 39* `let apikey = "riot api key`
  * Open Weather Api Key = *custom.js line 10* `let apikey = "openweather api key`
  

Special thanks to:
 
`Hiro Inu#1337, razpeitia#5174 - And everyone who apports to the bot via discord.`

 
