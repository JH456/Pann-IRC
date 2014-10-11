function yo(data, args, print) {
	data.request.post('http://api.justyo.co/yo/',
		{
			form: {
				api_token: data.yoToken,
				username: args[0]
			}
		},
		function(error, response, body) {
			if(body != '{"result": "OK"}') data.bot.say(data.channel, 'Error: ' + body);
			else if (print) data.bot.say(data.channel, 'Sent a yo to ' + args[0] + ' :D');
		}
	);
}

exports.yoTrue = function(data, args) {
	yo(data, args, true);
}

exports.list = function(data, args) {
	data.request.get('http://api.justyo.co/subscribers_count/?api_token='+data['yoToken'],
		function(error, response, body) {
			data.bot.say(data.channel, 'You have ' + body.split(' ')[1].split('}')[0] + ' subscribers! :D');
		}
	);
}

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

exports.floodBuffer = function (data, args) {
	data.bot.say(data.channel, 'Commenced Yo Flood to ' + args[0] + '. Will send ' + args[1] + ' yo\'s.');
	data.config.floodProgress[args[0]] = args[1];
	exports.flood(data, args);
}

exports.floodProgress = function (data, args) {
	data.bot.say(data.channel, 'Flood Progress:');
	for (var i in data.config.floodProgress) {
		data.bot.say(data.channel, i + ': ' + data.config.floodProgress[i]);
	}
}