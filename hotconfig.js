const fs = require("fs");

class Config {
	constructor(filename) {
		this.data = JSON.parse(fs.readFileSync(filename));
		fs.watchFile(filename, (curr, prev) => {
		  console.log("New config loaded");
		  this.data = JSON.parse(fs.readFileSync(filename));
		});
	}
}

exports.config = new Config("config.json");