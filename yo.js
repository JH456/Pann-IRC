/*
*	Author: Jim Harris
*	YO module for PannIRC
*	Implements the YO API to send people yos
*/

//Sends a yo
function yo(data, args, print) {
	data.request.post('http://api.justyo.co/yo/',
		{
			form: {
				api_token: data.yoToken,
				username: args[0]
			}
		},
		function(error, response, body) {
			if(body != '{\n  "success": true\n}') data.bot.say(data.channel, 'Error: ' + body);
			else if (print) data.bot.say(data.channel, 'Sent a yo to ' + args[0] + ' :D');
		}
	);
}

//Sends a yo, and prints out whether or not it succeeded
exports.yoTrue = function(data, args) {
	yo(data, args, true);
}

//List the number of subscribers that the bot's yo profile has
exports.list = function(data, args) {
	data.request.get('http://api.justyo.co/subscribers_count/?api_token='+data['yoToken'],
		function(error, response, body) {
			data.bot.say(data.channel, 'You have ' + body.split(' ')[1].split('}')[0] + ' subscribers! :D');
		}
	);
}

//Sends multiple yos to a user, over the stretch of several minutes
exports.flood = function(data, args) {
	var yoSent = false;
	if(args[1] > 0) {
		yo(data, args, false);
		data.config.floodProgress[args[0]]--;
		args[1]--;
		yoSent = true;
	}
	if(yoSent && args[1] > 0) setTimeout(function(){exports.flood(data, args)}, 70000);
	else {
		data.bot.say(data.channel, 'Completed Yo Flood to ' + args[0]);
		data.config.floodProgress[args[0]] = 'Complete';
	}
}

//Calls flood. This is the function the user calls. This sets up all of the variables, and starts the recursive flood
exports.floodBuffer = function (data, args) {
	data.bot.say(data.channel, 'Commenced Yo Flood to ' + args[0] + '. Will send ' + args[1] + ' yo\'s.');
	data.config.floodProgress[args[0]] = args[1];
	exports.flood(data, args);
}

//Prints out the progress of a yo flood to a certain user
exports.floodProgress = function (data, args) {
	data.bot.say(data.channel, 'Flood Progress:');
	for (var i in data.config.floodProgress) {
		data.bot.say(data.channel, i + ': ' + data.config.floodProgress[i]);
	}
}