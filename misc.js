/*
*	Author: Jim Harris
*	Miscellaneous module for PannIRC
*	Miscellaneous user functions
*/

//Helper for the dance function
exports.danceHelper = function(data, info, times, n, speed, dance) {
	var style;
	if (times == 1) style = dance.finale;
	else style = dance.steps[n];
	data.bot.say(info.channel, style);
	n++;
	if (n == dance.steps.length) n = 0;
	if (times > 1) setTimeout(function() {exports.danceHelper(data, info, times-1, n, speed, dance);}, (1000 / speed));
}

//Makes a dance pattern
exports.dance = function(data, args, info) {
	var channel = info.channel;
	var times = args[0];
	var speed = args[1];
	var dance = data.dances[Math.floor(Math.random()*data.dances.length)];
	if (speed == 0) {
		data.argFunctions.argumentsException(data);
		return;
	}
	exports.danceHelper(data, info, times, 0, speed, dance);
}

exports.partyPeople = function(data, args, info) {
}
