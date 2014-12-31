/*
*	Author: Jim Harris
*	Math module for PannIRC
*	Allows users to do arithmetic
*/

exports.add = function(data, args){
	data.bot.say(data.channel, args[0] + args[1]);
}

exports.subtract = function(data, args){
	data.bot.say(data.channel, args[0] - args[1]);	
}

exports.multiply = function(data, args){
	data.bot.say(data.channel, args[0] * args[1]);
}

exports.divide = function(data, args){
	data.bot.say(data.channel, args[0] / args[1]);
}

exports.squareRoot = function(data, args) {
	//TODO
}

exports.power = function(data, args) {
	//TODO
}

exports.derivative = function(data, args) {
	//TODO
}

exports.integral = function(data, args) {
	//TODO
}