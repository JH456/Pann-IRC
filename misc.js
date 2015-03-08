/*
*	Author: Jim Harris
*	Miscellaneous module for PannIRC
*	Miscellaneous user functions
*/

//Helper for the dance function
exports.danceHelper = function(data, times, n, speed, dance) {
	var style;
	if (times == 1) style = dance.finale;
	else style = dance.steps[n];
	data.bot.say(data.channel, style);
	n++;
	if (n == dance.steps.length) n = 0;
	if (times > 1) setTimeout(function() {exports.danceHelper(data, times-1, n, speed, dance);}, (1000 / speed));
}

//Makes a dance pattern
exports.dance = function(data, args) {
	var channel = data.channel;
	var times = args[0];
	var speed = args[1];
	var dance = data.config.dances[Math.floor(Math.random()*data.config.dances.length)];
	if (speed == 0) {
		data.argFunctions.argumentsException(data);
		return;
	}
	exports.danceHelper(data, times, 0, speed, dance);
}

exports.partyPeople = function(data, args) {
	
}