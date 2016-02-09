/*
*	Author: Jim Harris
*	YO module for PannIRC
*	Implements the YO API to send people yos
*/

var request = require('request');

//Sends a yo
function yo(data, args, info, print) {
	request.post('http://api.justyo.co/yo/',
		{
			form: {
				api_token: data.yoToken,
				username: args[0]
			}
		},
		function(error, response, body) {
			var message = eval('(' + body + ')');
			if(message.success == undefined) data.bot.say(info.channel, 'Error: ' + message.error + "!");
			else if (print) data.bot.say(info.channel, 'Sent a yo to ' + args[0] + '!');
		}
	);
}

//Sends a yo, and prints out whether or not it succeeded
exports.yoTrue = function(data, args, info) {
	yo(data, args, info, true);
}

//List the number of subscribers that the bot's yo profile has
exports.list = function(data, args, info) {
	request.get('http://api.justyo.co/subscribers_count/?api_token='+data['yoToken'],
		function(error, response, body) {
			data.bot.say(info.channel, 'You have ' + body.split(' ')[1].split('}')[0] + ' subscribers! :D');
		}
	);
}

//Sends multiple yos to a user, over the stretch of several minutes
exports.flood = function(data, args, info) {
	var yoSent = false;
	if(args[1] > 0) {
		yo(data, args, info, false);
		data.floodProgress[args[0]]--;
		args[1]--;
		yoSent = true;
	}
	if(yoSent && args[1] > 0) setTimeout(function(){exports.flood(data, args, info)},
        3000);
	else {
		data.bot.say(info.channel, 'Completed Yo Flood to ' + args[0]);
		data.floodProgress[args[0]] = 'Complete';
	}
}

//Calls flood. This is the function the user calls. This sets up all of the variables, and starts the recursive flood
exports.floodBuffer = function (data, args, info) {
	data.bot.say(info.channel, 'Commenced Yo Flood to ' + args[0] + '. Will send ' + args[1] + ' yo\'s.');
	data.floodProgress[args[0]] = args[1];
	exports.flood(data, args, info);
}

//Prints out the progress of a yo flood to a certain user
exports.floodProgress = function (data, args, info) {
	data.bot.say(info.channel, 'Flood Progress:');
	for (var i in data.floodProgress) {
		data.bot.say(info.channel, i + ': ' + data.floodProgress[i]);
	}
}
