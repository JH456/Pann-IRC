exports.get = function(data, args) {
	if (data.userData[args[0]] == undefined) {
		data.bot.say(data.channel, 'That user does not have a user profile...');
		return;
	}
	value = data.userData[args[0]][args[1]] != undefined ? data.userData[args[0]][args[1]] : 'undefined';
	data.bot.say(data.channel, args[0] + '\'s ' + args[1] + ' is ' + value);
}

exports.prof = function(data, args) {
	if (data.userData[args[0]] == undefined) {
		data.bot.say(data.channel, 'That user does not have a user profile...');
		return;
	}
	data.bot.say(data.channel, args[0] + '\'s Profile: ');
	if (data.userData[args[0]]['name'] != undefined) data.bot.say(data.channel, '|    Name: ' + data.userData[args[0]]['name']);
	if (data.userData[args[0]]['status'] != undefined) data.bot.say(data.channel, '|    Status: ' + data.userData[args[0]]['status']);
	var props = new Array();
	var j = 0;
	for (i in data.userData[args[0]]) {
		if (i != 'name' && i != 'status') {
			props[j] = i;
			j++;
		}
	}
	props.sort();
	var line = 0;
	for (var i = 0; i < props.length; i++) {
		data.bot.say(data.channel, '|    ' + props[i] + ': ' + data.userData[args[0]][props[i]]);
		line = Math.max(line, data.userData[args[0]][props[i]].length + props[i].length);
	}
	var linemsg = 'L___';
	for (var i = 0; i < line; i++) linemsg += '_';
	data.bot.say(data.channel, linemsg);
}

exports.remove = function(data, args) {
	if (data.userData[data.from] == undefined) {
		data.bot.say(data.channel, 'You do not have a user profile...');
		return;
	}
	if (data.userData[data.from][args[0]] == undefined) {
		data.bot.say(data.channel, 'You do not have that value saved under your profile...');
		return;	
	}
	delete data.userData[data.from][args[0]];
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.from + '\'s ' + args[0] + ' has been erased.');
}

exports.set = function(data, args) {
	if (data.userData[data.from] == undefined) data.userData[data.from] = {};
	data.userData[data.from][args[0]] = args[1];
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.from + '\'s ' + args[0] + ' has been set to ' + args[1]);
}