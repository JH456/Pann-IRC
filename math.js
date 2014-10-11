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

}

exports.power = function(data, args) {

}

exports.derivative = function(data, args) {

}

exports.integral = function(data, args) {

}