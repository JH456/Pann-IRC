/*
*	Author: Jim Harris
*	User data module for PannIRC
*	The social networking part of the IRC bot
*/

//Returns a certain user's specified attribute
exports.get = function(data, args) {
	if (data.userData[args[0]] == undefined) {
		data.bot.say(data.channel, 'That user does not have a user profile...');
		return;
	}
	var isFriend = (data.userData[args[0] + '_friends'] != undefined && data.userData[args[0] + '_friends'][data.from] == true);
	if ((args[1].indexOf('private_') != 0 || isFriend || args[0] == data.from)) value = data.userData[args[0]][args[1]] != undefined ? data.userData[args[0]][args[1]] : 'undefined';
	else {
		data.bot.say(data.channel, 'You do not have friend permissions to see ' + args[0] + '\'s privates.');
		return;
	}
	data.bot.say(data.channel, args[0] + '\'s ' + args[1] + ' is ' + value);
}

//PMs you the selected user's profile
exports.prof = function(data, args) {
	if (data.userData[args[0]] == undefined) {
		data.bot.say(data.from, 'That user does not have a user profile...');
		return;
	}

	var isFriend = (data.userData[args[0] + '_friends'] != undefined && data.userData[args[0] + '_friends'][data.from] == true);

	data.bot.say(data.from, args[0] + '\'s Profile: ');
	if (data.userData[args[0]]['name'] != undefined) data.bot.say(data.from, '|    Name: ' + data.userData[args[0]]['name']);
	if (data.userData[args[0]]['status'] != undefined) data.bot.say(data.from, '|    Status: ' + data.userData[args[0]]['status']);
	var props = new Array();
	var j = 0;
	for (i in data.userData[args[0]]) {
		if (i != 'name' && i != 'status' && (i.indexOf('private_') != 0 || isFriend || args[0] == data.from)) {
			props[j] = i;
			j++;
		}
	}
	props.sort();
	var line = 0;
	for (var i = 0; i < props.length; i++) {
		data.bot.say(data.from, '|    ' + props[i] + ': ' + data.userData[args[0]][props[i]]);
		line = Math.max(line, data.userData[args[0]][props[i]].length + props[i].length);
	}
	var linemsg = 'L___';
	for (var i = 0; i < line; i++) linemsg += '_';
	data.bot.say(data.from, linemsg);
}

//Removes an attribute from your profile
exports.remove = function(data, args) {
	if (data.userData[data.from] == undefined) {
		data.bot.say(data.from, 'You do not have a user profile...');
		return;
	}
	if (data.userData[data.from][args[0]] == undefined) {
		data.bot.say(data.channel, 'You do not have that value saved under your profile...');
		return;	
	}
	delete data.userData[data.from][args[0]];
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.channel + '\'s ' + args[0] + ' has been erased.');
}

//Sets an attribute in your profile. Prefixing the name with private_ designates it as private, and only friends can see private_ prefixed attributes
exports.set = function(data, args) {
	if (data.userData[data.from] == undefined) data.userData[data.from] = {};
	data.userData[data.from][args[0]] = args[1];
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.from + '\'s ' + args[0] + ' has been set to ' + args[1]);
}

//Add a user to your friends list
exports.friend = function(data, args) {
	if (data.userData[data.from + '_friends'] == undefined) data.userData[data.from + "_friends"] = {};
	data.userData[data.from + "_friends"][args[0]] = true;
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.from + ' has befriended ' + args[0] + '!');
}

//Remove a user from your friends list
exports.unfriend = function(data, args) {
	if (data.userData[data.from + '_friends'] == undefined) data.userData[data.from + "_friends"] = {};
	if (data.userData[data.from + '_friends'][args[0]] == undefined) {
		data.bot.say(data.channel, 'You have not friended that person.');
		return;	
	}
	delete data.userData[data.from + '_friends'][args[0]];
	data.fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(data.channel, data.from + ' has unfriended ' + args[0] + '!');
}