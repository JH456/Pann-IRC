var math = require('./math.js');
var yo = require('./yo.js');
var misc = require('./misc.js');
var gen = require('./gen.js');
var userData = require('./userData.js');
var crypto = require('./cryptography.js');

exports.config = {
	botName: 'bot',
	servers: [
		{
			serverName: /*Server name as a string*/,
			channels: [
				//insert channel names here as strings
			]
		},
	],
	floodProgress: [],
	responseConfig: [
		{
			triggers: [
				'affirmative',
				'of course',
				'for sure',
				'fo sho',
				'fo\' sho\'',
				'fo show',
				'fo\' show',
				'trudat',
				'trufax',
				'fo real',
				'for real'
			],
			response: 'yee'
		}
	],
	commands: [
		{
			names: ['l', 'ls', 'list'],
			argsCode: 0,
			m: gen.list,
			desc: 'Lists all responses and their trigger phrases.'
		},
		{
			names: ['r', 'repeat'],
			argsCode: ['s'],
			m: gen.repeat,
			desc: 'Repeats the given string.'
		},
		{
			names: ['ma', 'mathadd', 'add'],
			argsCode: ['n', 'n'],
			m: math.add,
			desc: 'Adds two numbers together. Supports decimals, but not fractions.'
		},
		{
			names: ['ms', 'mathsubtract', 'subtract'],
			argsCode: ['n', 'n'],
			m: math.subtract,
			desc: 'Subtracts the second number from the first. Supports decimals, but not fractions.'
		},
		{
			names: ['mm', 'mathmultiply', 'multiply'],
			argsCode: ['n', 'n'],
			m: math.multiply,
			desc: 'Multiplies two numbers together. Supports decimals, but not fractions.'
		},
		{
			names: ['md', 'mathdivide', 'divide'],
			argsCode: ['n', 'n'],
			m: math.divide,
			desc: 'Divides the first number by the second one. Supports decimals, but not fractions.'
		},
		{
			names: ['yol', 'yolist'],
			argsCode: 0,
			m: yo.list,
			desc: 'Prints the number of subscribers to your YO account.'
		},
		{
			names: ['yo'],
			argsCode: ['s'],
			m: yo.yoTrue,
			desc: 'Sends a yo to the given user. The user must have sent a yo to your account before, and only one yo can be sent per user per minute.'
		},
		{
			names: ['yof', 'yoflood', 'yospam'],
			argsCode: ['s', 'n'],
			m: yo.floodBuffer,
			desc: 'Sends the specified number of yos to the given user.'
		},
		{
			names: ['yofp', 'yofloodprogress'],
			argsCode: 0,
			m: yo.floodProgress,
			desc: 'Logs all of your current yo flood victims and the number of yos that have yet to be sent to them.'
		},
		{
			names: ['d', 'dance'],
			argsCode: ['n', 'n'],
			m: misc.dance,
			desc: 'Prints a dance in chat, with the specified number of steps and at the specified speed.'
		},
		{
			names: ['help'],
			argsCode: ['s'],
			m: gen.help,
			desc: 'Prints information about the given command in chat. It first prints all argument types in order. Then, it prints all of the commands names. If the command has no other names, it will print nothing. All names will be lowercase, but case does not matter in the call. It then prints a description of the function. The description should print the purposes of all arguments, and mention the arguments in the order that they are needed in the function call.'
		},
		{
			names: ['set'],
			argsCode: ['s', 'a'],
			m: userData.set,
			desc: 'Sets the user\'s variable to the specified value.'
		},
		{
			names: ['get'],
			argsCode: ['s', 's'],
			m: userData.get,
			desc: 'Gets the user\'s variable of the given name'
		},
		{
			names: ['remove', 'rm'],
			argsCode: ['s'],
			m: userData.remove,
			desc: 'Erases the specified value on the user\'s profile.'
		},
		{
			names: ['profile'],
			argsCode: ['s'],
			m: userData.prof,
			desc: 'Prints out the given user\'s profile'
		},
		{
			names: ['vigenere', 'encrypt2', 'e2', 'ev'],
			argsCode: ['s', 'a'],
			m: crypto.vigenere,
			desc: 'Encrypts the second argument using vigenre\'s cipher with the first argument as the key.'
		},
		{
			names: ['caesar', 'encrypt', 'e', 'ec'],
			argsCode: ['n', 'a'],
			m: crypto.sayCaesar,
			desc: 'Encrypts the second argument using a caesar cipher using the first argument, a number, as the key.'
		}
	]
};

exports.getFunction = function (name) {
	for (var i = 0; i < exports.config.commands.length; i++) {
		var names = exports.config.commands[i].names;
		for (var j = 0; j < names.length; j++) {
			if (names[j] == name) return i;
		}
	}
	return -1;
}
