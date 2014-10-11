var irc = require("irc");
var request = require('request');
var math = require('./math.js');
var yo = require('./yo.js');
var misc = require('./misc.js');
var gen = require('./gen.js');
var config = require('./config.js');
var argFunctions = require('./argFunctions.js');
var userDataFunctions = require('./userData.js');
var userData = require('./userData.json');
var fs = require('fs');
var crypto = require('./cryptography.js');
var yoToken = 'tokenForYoAPIAccount';


var bot = new irc.Client(config.config.servers[0].serverName, config.config.botName, {
	channels: config.config.servers[0].channels,
	userName: config.config.botName.toLowerCase(),
	port: 6697,
	secure: true,
	selfSigned: true,
	realName: config.config.botName
});

bot.addListener("join", function(channel, who) {
	//if (who == config.config.botName) bot.say(channel, "ALRIGHT. OKAY. ALRIGHT OKAY.");
});

bot.addListener("registered", function(message) {
	//replace identify with group <nick> if changing names
    bot.say("nickserv", 'identify <nickServPassword>');
});

bot.addListener("message", function(from, to, text, message) {
	var data = {fs: fs, from: from, to: to, text: text, channel: message.args[0], bot: bot, yoToken: yoToken, crypto: crypto, config: config.config, rConfig: config, irc: irc, request: request, math: math, yo: yo, misc: misc, gen: gen, argFunctions: argFunctions, userDataFunctions: userDataFunctions, userData: userData};

	if (text.indexOf('*') == 0 && data.text.length > 1 && text[1] != ' ') {
		
		var command = 'UNKNOWN';
		var args = new Array(0);

		if (data.text.length > 1) {
			command = data.text.indexOf(' ') == -1 ? data.text.substring(1, data.text.length).toLowerCase() : data.text.substring(1, data.text.indexOf(' ')).toLowerCase();
			args = data.text.split(' ');
			args.splice(0, 1);
		}

		var action = config.getFunction(command);

		if (action != -1) {
			argFunctions.call(data, args, action);
		}
		else bot.say(data.channel, '404: Command not found');
	}
	
	for (var i = 0; i < data.config.responseConfig.length; i++) {
		for (var j = 0; j < data.config.responseConfig[i].triggers.length; j++) {
			if (data.text.indexOf(data.config.responseConfig[i].triggers[j]) != -1) {
				bot.say(data.channel, data.config.responseConfig[i].response);
			}
		}
	}
});
