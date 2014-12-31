/*
*	Author: Jim Harris
*	Miscellaneous module for PannIRC
*	Miscellaneous user functions
*/

//Helper for the dance function
exports.danceHelper = function(data, times, n, speed) {
	var style;
	if (times == 1) style = '\\o/';
	else if (n == 1) style = '/o/';
	else style = '\\o\\';
	data.bot.say(data.channel, style);
	if (times > 1) setTimeout(function() {exports.danceHelper(data, times-1, n*-1, speed);}, (1000 / speed));
}

//Makes a dance pattern
exports.dance = function(data, args) {
	var channel = data.channel; var times = args[0]; var speed = args[1];
	if (speed == 0) {
		data.argFunctions.argumentsException(data);
		return;
	}
	exports.danceHelper(data, times, 1, speed);
}