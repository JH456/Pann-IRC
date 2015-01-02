/*
*	Author: Jim Harris
*	Main file for PannIRC
*	Creates listeners and handles messages
*/


//Include some files
var irc = require("irc");
var request = require('request');
var fs = require('fs');
var config = require('./config.js');

//Declare and initialize the bot
var bot = new irc.Client(config.config.servers[0].serverName, config.config.botName, {
	channels: config.config.servers[0].channels,
	userName: config.config.botName.toLowerCase(),
	port: 6697,
	secure: true,
	selfSigned: true,
	realName: config.config.botName
});

//Create a data object to pass into custom bot functions
var data = {
	fs: fs,
	bot: bot,
	yoToken: config.yoToken,
	crypto: config.crypt,
	config: config.config,
	rConfig: config,
	irc: irc,
	request: request,
	math: config.math,
	yo: config.yo,
	misc: config.misc,
	gen: config.gen,
	argFunctions: config.argFunctions,
	userDataFunctions: config.userDataFunctions,
	userData: config.userData
};

//Register nick upon connection to the network
bot.addListener("registered", function(message) {
	//replace identify with group <bot's original nick> if changing names
    bot.say("nickserv", 'identify botNickPassword');
});

//Function that handles message to the bot, or to a channel the bot sits in
function handleMessage (from, to, text, message, pm) {

	//Nick that sent the message
	data.from = from;
	//Where the message was sent
	data.to = to;
	//The text within the message
	data.text = text;
	//The message itself
	data.message = message;
	//The channel the message passed through. If it was a pm, it is just the user who it was from. Otherwise, it is an element of message.args.
	data.channel = pm ? from : message.args[0];
	
	//If the message is a command
	if (data.text.indexOf('*') == 0 && data.text.length > 1 && data.text[1] != ' ') {
		
		//Declare the variables for the command's name, and the command's arguments
		var command = 'UNKNOWN';
		var args = new Array(0);

		//Set the command, and the arguments
		if (data.text.length > 1) {
			//Set the command
			command = data.text.indexOf(' ') == -1 ? data.text.substring(1, data.text.length).toLowerCase() : data.text.substring(1, data.text.indexOf(' ')).toLowerCase();
			//Set arguments
			args = data.text.split(' ');
			//Splice the command from the arguments
			args.splice(0, 1);
		}

		//The function that the command name refers to in config
		var action = config.getFunction(command);

		//If the action is valid
		if (action != -1) {
			//Call the function with the arguments, and pass it data
			config.argFunctions.call(data, args, action);
		}
		//If the action does not exist, return an error instead
		else bot.say(data.channel, '404: Command not found');
	}
	
	//Determine if any trigger words were said
	for (var i = 0; i < data.config.responseConfig.length; i++) {
		for (var j = 0; j < data.config.responseConfig[i].triggers.length; j++) {
			if (data.text.indexOf(data.config.responseConfig[i].triggers[j]) != -1) {
				//Say the response
				bot.say(data.channel, data.config.responseConfig[i].response);
			}
		}
	}

}

//Create a listener to handle messages to a channel
bot.addListener("message", function (from, to, text, message) {

	handleMessage(from, to, text, message, to === config.config.botName);

});
