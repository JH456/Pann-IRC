/*
*	Author: Jim Harris
*	General module for PannIRC
*	General functions
*/

//This lists all of the bot's responses and the words that trigger them. They are sent in the form of a PM to avoid spamming the channel.
exports.list = function(data, args, info) {
	for (var i = 0; i < data.responseConfig.length; i++) {
		data.bot.say(info.from, 'List of Trigger Word for, \'' + data.responseConfig[i].response + '\':');
		for (var j = 0; j < data.responseConfig[i].triggers.length; j++) {
			data.bot.say(info.from, data.responseConfig[i].triggers[j]);
		}
	}
}

exports.login = function (data, args, info) {
    data.bot.send("whois", info.from);
}

//Repeats the given argument.
//TODO: Make this administrative only
exports.repeat = function(data, args, info) {
	data.bot.say(info.channel, args[0]);
}

//Gives help information for the given command.
exports.help = function(data, args, info) {
	var foundCommand = false;
	for (var i = 0; i < data.config.commands.length && !foundCommand; i++) {
        var names = data.config.commands[i].names;
		for (var j = 0; j < names.length && !foundCommand; j++) {
			if (data.config.commands[i].names[j] == args[0]) {
				foundCommand = true;
                var functions = data.config.commands[i].functions;
                var allowedUsers = data.config.commands[i].allowedUsers;
                var desc = data.config.commands[i].desc;
                data.bot.say(info.from, 'Names:');
                for (var n in names) {
                    data.bot.say(info.from, '  ' + names[n]);
                }
                data.bot.say(info.from, 'Usage:');
                for (var f in functions) {
                    var argsString = '';
                    var argsCode = functions[f].argsCode;
                    if (argsCode != 0) {
                        for (var s in argsCode) {
                            var outCode = argsCode[s];
                            if (outCode.length < 1) {
                                outCode = 'BAD ARGUMENT';
                            } else if (outCode.charAt(0) == 'i') {
                                outCode = 'Integer' + outCode.substr(1);
                            } else if (outCode.charAt(0) == 'n') {
                                outCode = 'Number' + outCode.substr(1);
                            } else if (outCode.charAt(0) == 's') {
                                outCode = 'String' + outCode.substr(1);
                            } else if (outCode.charAt(0) == 'a') {
                                outCode = 'Sentence' + outCode.substr(1);
                            } else {
                                outCode = 'BAD ARGUMENT';
                            }
                            argsString += ('<' + outCode + '> ');
                        }
                    }
                    data.bot.say(info.from, '  *' + args[0] + ' ' + argsString);
                }
                data.bot.say(info.from, 'Allowed Users:');
                if (allowedUsers == 'ALL') {
                    data.bot.say(info.from, '  ALL');
                } else {
                    for (var u in allowedUsers) {
                        data.bot.say(info.from, '  ' + allowedUsers[u]);
                    }
                }
                data.bot.say(info.from, 'Description: ' + desc);
			}
		}
	}
	if (!foundCommand) data.bot.say(info.channel, '404: Command not found.')
}
