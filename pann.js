/**
 *	Author: Jim Harris
 *	Main file for Pann-IRC
 *	Creates listeners and handles messages
 */

//Include some files
var irc = require("irc");
var argFunctions = require('./argFunctions.js');
var rootConfig = require('./config.js');
var config = rootConfig.config;
var data = rootConfig.data;

//Declare and initialize the bot
var bot = new irc.Client(config.servers[0].serverName, config.botName, {
	channels: config.servers[0].channels,
	userName: config.botName.toLowerCase(),
	port: 6697,
	secure: true,
	selfSigned: true,
	realName: config.botName
});

//Create a data object to pass into custom bot functions
data.bot = bot;
data.config = config;

//Register nick upon connection to the network
bot.addListener("registered", function(message) {
	//Use this to register your bot's nick.
    bot.say("nickserv", config.nickservMessage);
});

//Function that handles message to the bot, or to a channel the bot sits in
function handleMessage (from, to, text, message, pm) {

    // Stores the message information
    var info = {};

	//Nick that sent the message
	info.from = from;
	//Where the message was sent
	info.to = to;
	//The text within the message
	info.text = text;
	//The message itself
	info.message = message;
	//The channel the message passed through. If it was a pm, it is just the
	//user who it was from. Otherwise, it is an element of message.args.
	info.channel = pm ? from : message.args[0];

    if (from == '*') {
        console.log(text);
    }

	//If the message is a command
	if (text.indexOf('*') == 0 && text.length > 1 && text[1] != ' ') {
		//Declare the variables for the command's name, and the command's
		//arguments
		var command = 'UNKNOWN';
		var args = new Array(0);

		//Set the command, and the arguments
		if (text.length > 1) {
			//Set the command
			command = text.indexOf(' ') == -1
			    ? text.substring(1, text.length).toLowerCase()
			    : text.substring(1, text.indexOf(' ')).toLowerCase();
			//Set arguments
			args = text.split(' ');
			//Splice the command from the arguments
			args.splice(0, 1);
		}

		//The function that the command name refers to in config
		var action = getFunction(command);

		//If the action is valid
		if (action != -1) {
			//Call the function with the arguments, and pass it data
			argFunctions.call(data, args, info, action);
		}
		//If the action does not exist, return an error instead
		else bot.say(data.channel, 'Command not found');
	}
	//Determine if any trigger words were said
	for (var i = 0; i < data.responseConfig.length; i++) {
		for (var j = 0; j < data.responseConfig[i].triggers.length; j++) {
			if (text.toLowerCase().indexOf(
			data.responseConfig[i].triggers[j]) != -1) {
				//Say the response
				bot.say(info.channel, data.responseConfig[i].response);
			}
		}
	}
}

//Create a listener to handle messages to a channel
bot.addListener("message", function (from, to, text, message) {

	handleMessage(from, to, text, message, to === config.botName);

});

bot.addListener("raw", function (message) {
    var args = message.args;
    if (message.command == 'NICK' || message.command == 'PART') {
        logout(message.nick);
    } else if (message.command == 'KICK') {
        logout(args[1]);
    } if (args.length == 3
        && args[2] == 'has identified for this nick') {
        if (data.registry == undefined) {
            data.registry = [];
            data.registry[0] = {};
        }
        data.registry[0][args[1]] = true;
        data.bot.say(args[1], 'Login successful! You may now use restricted '
            + 'commands to which you have access!');
    } else if (args.length == 3 && args[2] == 'End of /WHOIS list.'
        && (data.registry == undefined || data.registry[0][args[1]] != true)) {
        data.bot.say(args[1], 'You must identify with NickServ to login!');
    }
});

function logout(nick) {
    if (data.registry != undefined && data.registry[0][nick] == true) {
        data.registry[0][nick] = false;
    }
}

//Get the function associated with the given name
function getFunction (name) {
	for (var i = 0; i < config.commands.length; i++) {
		var names = config.commands[i].names;
		for (var j = 0; j < names.length; j++) {
			if (names[j] == name) return i;
		}
	}
	return -1;
}
