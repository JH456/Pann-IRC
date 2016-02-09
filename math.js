/*
*	Author: Jim Harris
*	Math module for PannIRC
*	Allows users to do arithmetic
*/

exports.add = function(data, args, info){
	data.bot.say(info.channel, args[0] + args[1]);
}

exports.subtract = function(data, args, info){
	data.bot.say(info.channel, args[0] - args[1]);
}

exports.multiply = function(data, args, info){
	data.bot.say(info.channel, args[0] * args[1]);
}

exports.divide = function(data, args, info){
	data.bot.say(info.channel, args[0] / args[1]);
}

exports.squareRoot = function(data, args, info) {
	//TODO
}

exports.power = function(data, args, info) {
	//TODO
}

exports.derivative = function(data, args, info) {
	//TODO
}

exports.integral = function(data, args, info) {
	//TODO
}
