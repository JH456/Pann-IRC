/*
*	Author: Jim Harris
*	Arguments functions file for PannIRC
*	Handles arguments exceptions and calling custom functions
*/

exports.argumentsException = function (data) {
	data.bot.say(data.channel, '001: Arguments exception. Type *help(commandName) to see the appropriate arguments for a command.');
}

exports.call = function (data, args, command) {
	var argsCode = data.config.commands[command].argsCode;
	var r = typeof argsCode == 'number' ? new Array(0) : new Array(argsCode.length);
	if ( !(argsCode == 0 && args.length == 0) && (argsCode.length != args.length) && (argsCode[argsCode.length-1] != 'a') ) {
		exports.argumentsException(data);
		return;
	}
	for (var i = 0; i < argsCode.length; i++) {
		if (argsCode[i] == 'n') {
			r[i] = parseFloat(args[i]);
			if (isNaN(r[i])) {
				exports.argumentsException(data);
				return;
			}
		}
		else if (argsCode[i] == 'a') {
			if (i == argsCode.length-1) {
				for (var j = i; j < args.length; j++) {
					if (i == j) r[i] = args[j];
					else r[i] += ' ' + args[j];
				}
			}
			else {
				exports.argumentsException(data);
				return;
			}
		}
		else r[i] = args[i];
	}
	for (var i = 0; i < r.length; i++) {
		if (r[i] == undefined) {
			exports.argumentsException(data);
			return;
		}
	}
	data.config.commands[command].m(data, r);
}