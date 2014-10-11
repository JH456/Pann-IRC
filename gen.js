//This lists all of the bot's responses and the words that trigger them. They are sent in the form of a PM to avoid spamming the channel.
exports.list = function(data, args) {
	for (var i = 0; i < data.config.responseConfig.length; i++) {
		data.bot.say(data.from, 'List of Trigger Word for, \'' + data.config.responseConfig[i].response + '\':');
		for (var j = 0; j < data.config.responseConfig[i].triggers.length; j++) {
			data.bot.say(data.from, data.config.responseConfig[i].triggers[j]);
		}
	}
}

//Repeats the given argument.
exports.repeat = function(data, args) {
	data.bot.say(data.channel, args[0]);
}

//Gives help information for the given command.
exports.help = function(data, args) {
	var foundCommand = false;
	for (var i = 0; i < data.config.commands.length; i++) {
		for (var j = 0; j < data.config.commands[i].names.length; j++) {
			if (data.config.commands[i].names[j] == args[0]) {
				foundCommand = true;
				var argsCode = data.config.commands[i].argsCode;
				var statement = '';
				if (argsCode == 0) {
					statement = 'takes no arguments.';
				}
				else {
					statement += 'takes a';
					for (var k = 0; k < argsCode.length; k++) {
						if (argsCode[k] == 'n') statement += ' a number';
						else statement += ' a string';
						if (k == argsCode.length - 1) statement += '.';
						else if (k == argsCode.length - 2) statement += ' and';
						else statement += ','
					}
				}
				if (data.config.commands[i].names.length > 1) {
					statement += ' Aliases include:';
					for (var k = 0; k < data.config.commands[i].names.length; k++) {
						statement += ' ' + data.config.commands[i].names[k];
						if (k == data.config.commands[i].names.length - 1) statement += '.';
						else if (k == data.config.commands[i].names.length - 2) statement += ' and';
						else statement += ','
					}
				}
				statement += ' ' + data.config.commands[i].desc;
				data.bot.say(data.channel, 'The function, \'' + args[0] + '\' ' + statement);
				return;
			}
		}
	}
	if (!foundCommand) data.bot.say(data.channel, '404: Command not found.')
}