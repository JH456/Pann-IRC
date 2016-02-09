/*
*	Author: Jim Harris
*	User data module for PannIRC
*	The social networking part of the IRC bot
*/

/*exports.identify = function (data, args, info) {

}

function get (data, args, info) {
	if (data.userData[args[0]] == undefined) return undefined;
	var userVar = data.userData[args[0]];
	var isPrivate = false;
	if (userVar.indexOf("_private") == 0) {

	}
	var field = {
		data.userData[args[0]]
	};
}*/

var fs = require('fs');

//Returns a certain user's specified attribute
exports.get = function(data, args, info) {
	args[0] = args[0].toLowerCase();
	if (data.userData[args[0]] == undefined) {
		data.bot.say(info.channel, 'That user does not have a user profile...');
		return;
	}
	var isFriend = (data.userData[args[0] + '_friends'] != undefined && data.userData[args[0] + '_friends'][info.from] == true);
	if ((args[1].indexOf('private_') != 0 || isFriend || args[0] == info.from)) value = data.userData[args[0]][args[1]] != undefined ? data.userData[args[0]][args[1]] : 'undefined';
	else {
		data.bot.say(info.channel, 'You do not have friend permissions to see ' + args[0] + '\'s privates.');
		return;
	}
	data.bot.say(info.channel, args[0] + '\'s ' + args[1] + ' is ' + value);
}

//PMs you the selected user's profile
exports.prof = function(data, args, info) {
	args[0] = args[0].toLowerCase();
	if (data.userData[args[0]] == undefined) {
		data.bot.say(info.from, 'That user does not have a user profile...');
		return;
	}

	var isFriend = (data.userData[args[0] + '_friends'] != undefined && data.userData[args[0] + '_friends'][info.from] == true);

	data.bot.say(info.from, args[0] + '\'s Profile: ');
	if (data.userData[args[0]]['name'] != undefined) data.bot.say(info.from, '|    Name: ' + data.userData[args[0]]['name']);
	if (data.userData[args[0]]['status'] != undefined) data.bot.say(info.from, '|    Status: ' + data.userData[args[0]]['status']);
	var props = new Array();
	var j = 0;
	for (i in data.userData[args[0]]) {
		if (i != 'name' && i != 'status' && (i.indexOf('private_') != 0 || isFriend || args[0] == info.from)) {
			props[j] = i;
			j++;
		}
	}
	props.sort();
	var line = 0;
	for (var i = 0; i < props.length; i++) {
		data.bot.say(info.from, '|    ' + props[i] + ': ' + data.userData[args[0]][props[i]]);
		line = Math.max(line, data.userData[args[0]][props[i]].length + props[i].length);
	}
	var linemsg = 'L______';
	for (var i = 0; i < line; i++) linemsg += '_';
	data.bot.say(info.from, linemsg);
}

//Removes an attribute from your profile
exports.remove = function(data, args, info) {
    info.from = info.from.toLowerCase();
	if (data.userData[info.from] == undefined) {
		data.bot.say(info.from, 'You do not have a user profile...');
		return;
	}
	if (data.userData[info.from][args[0]] == undefined) {
		data.bot.say(info.from, 'You do not have that value saved under your profile...');
		return;	
	}
	delete data.userData[info.from][args[0]];
	fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(info.channel, 'Your ' + args[0] + ' has been erased.');
}

//Sets an attribute in your profile. Prefixing the name with private_ designates it as private, and only friends can see private_ prefixed attributes
exports.set = function(data, args, info) {
    info.from = info.from.toLowerCase();
	if (data.userData[info.from] == undefined) data.userData[info.from] = {};
	data.userData[info.from][args[0]] = args[1];
	fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(info.channel, info.from + '\'s ' + args[0] + ' has been set to ' + args[1]);
}

//Add a user to your friends list
exports.friend = function(data, args, info) {
	args[0] = args[0].toLowerCase();
	if (data.userData[info.from + '_friends'] == undefined) data.userData[info.from + "_friends"] = {};
	data.userData[info.from + "_friends"][args[0]] = true;
	fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(info.channel, info.from + ' has befriended ' + args[0] + '!');
}

//Remove a user from your friends list
exports.unfriend = function(data, args, info) {
	args[0] = args[0].toLowerCase();
	if (data.userData[info.from + '_friends'] == undefined) data.userData[info.from + "_friends"] = {};
	if (data.userData[info.from + '_friends'][args[0]] == undefined) {
		data.bot.say(info.channel, 'You have not friended that person.');
		return;	
	}
	delete data.userData[info.from + '_friends'][args[0]];
	fs.writeFileSync('./userData.json', JSON.stringify(data.userData, null, 4));
	data.bot.say(info.channel, info.from + ' has unfriended ' + args[0] + '!');
}
