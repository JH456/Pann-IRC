/**
 *	Author: Jim Harris
 *	Arguments functions file for PannIRC
 *	Handles arguments exceptions and calling custom functions
 */

function argumentsException (data, info) {
	data.bot.say(info.channel,
	'Sorry, but your arguments are wrong...');
}

exports.call = function (data, args, info, command) {
	var called = false;
	var functions = data.config.commands[command].functions;

	if (data.config.commands[command].allowedUsers != 'ALL'
    && data.config.commands[command].allowedUsers != 'ID'
	&& data.config.commands[command].allowedUsers.indexOf(
	info.from) == -1) {
		data.bot.say(info.channel, "Permission denied. T_T");
		return;
	} else if (data.config.commands[command].allowedUsers != 'ALL' &&
        (data.registry == undefined || data.registry[0][info.from] != true)) {
        data.bot.say(info.channel, "You need to login!");
        return;
    }


	for (var i = 0; i < functions.length && !called; i++) {

		var argsCode = functions[i].argsCode;
		// If argscode is just a number rather than an array, make r an array
		// of length 0, otherwise make it an array of argscode's length
		var r = typeof argsCode == 'number'
		    ? new Array(0)
		    : new Array(argsCode.length);

		if ( (argsCode == 0 && args.length == 0)
		    || (argsCode.length == args.length)
		    || (argsCode[argsCode.length-1].charAt(0) == 'a') ) {

		    var invalid = false;
		    for (var j = 0; j < r.length && !invalid; j++) {
                if (argsCode[j].length < 1) {
                    invalid = true;
                } else if (argsCode[j].charAt(0) == 'n') {
				    r[j] = parseFloat(args[j]);
				    if (isNaN(r[j])) {
					    invalid = true;
				    }
			    } else if (argsCode[j].charAt(0) == 'i') {
				    r[j] = parseInt(args[j]);
				    if (isNaN(r[j])) {
					    invalid = true;
				    }
			    } else if (argsCode[j].charAt(0) == 'a') {
				    if (j == argsCode.length-1) {
					    for (var k = j; k < args.length; k++) {
						    if (j == k) r[j] = args[k];
						    else r[j] += ' ' + args[k];
					    }
				    } else {
					    invalid = true;
				    }
			    } else if (argsCode[j].charAt(0) == 's') {
                    r[j] = args[j];
                } else {
                    invalid = true;
                }
		    }

		    for (var j = 0; j < r.length && !invalid; j++) {
			    if (r[j] == undefined) {
				    invalid = true;
			    }
		    }
		    if (!invalid) {
		        called = true;
		        functions[i].funcRef(data, r, info);
            }
        }
	}

	if (!called) argumentsException(data, info);
}
