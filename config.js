/*
*	Author: Jim Harris
*	Config file for PannIRC
*	Includes all modules and bot info (responses, server and channel info, command info)
*/

exports.math = require('./math.js');
exports.yo = require('./yo.js');
exports.misc = require('./misc.js');
exports.gen = require('./gen.js');
exports.userData = require('./userData.json');
exports.userDataFunctions = require('./userData.js');
exports.crypt = require('./cryptography.js');
exports.argFunctions = require('./argFunctions.js');
exports.yoToken = 'yo api token here';

exports.config = {
	botName: "Pann",
	servers: [
		{
			serverName: 'server',
			channels: [
				'channel'
			]
		},
	],
	floodProgress: [],
	dances: [
		{
			steps: ['\\o\\', '/o/'],
			finale: '\\o/'
		},
		{
			steps: ['vov', '\\o/'],
			finale: '/o\\'
		},
		{
			steps: ['<o>', '\\o/'],
			finale: '/o\\'
		},
		{
			steps: ['lol', '\\o\\'],
			finale: '\\o/'
		},
		{
			steps: ['\\o/', '<o>', '<o-', '/o\\'],
			finale: '\\o/'
		}
	],
	responseConfig: [
		{
			triggers: [
				':(',
				');',
				'),:',
				':\'('
			],
			response: ':,('
		},
		{
			triggers: ['oman'],
			response: 'yemen'
		}
	],
	commands: [
		{
			names: ['l', 'ls', 'list'],
			argsCode: 0,
			m: exports.gen.list,
			desc: 'Lists all responses and their trigger phrases.'
		},
		{
			names: ['r', 'repeat'],
			argsCode: ['a'],
			m: exports.gen.repeat,
			desc: 'Repeats the given string.'
		},
		{
			names: ['ma', 'mathadd', 'add'],
			argsCode: ['n', 'n'],
			m: exports.math.add,
			desc: 'Adds two numbers together. Supports decimals, but not fractions.'
		},
		{
			names: ['ms', 'mathsubtract', 'subtract'],
			argsCode: ['n', 'n'],
			m: exports.math.subtract,
			desc: 'Subtracts the second number from the first. Supports decimals, but not fractions.'
		},
		{
			names: ['mm', 'mathmultiply', 'multiply'],
			argsCode: ['n', 'n'],
			m: exports.math.multiply,
			desc: 'Multiplies two numbers together. Supports decimals, but not fractions.'
		},
		{
			names: ['md', 'mathdivide', 'divide'],
			argsCode: ['n', 'n'],
			m: exports.math.divide,
			desc: 'Divides the first number by the second one. Supports decimals, but not fractions.'
		},
		{
			names: ['yol', 'yolist'],
			argsCode: 0,
			m: exports.yo.list,
			desc: 'Prints the number of subscribers to your YO account.'
		},
		{
			names: ['yo'],
			argsCode: ['s'],
			m: exports.yo.yoTrue,
			desc: 'Sends a yo to the given user. The user must have sent a yo to your account before, and only one yo can be sent per user per minute.'
		},
		{
			names: ['yof', 'yoflood', 'yospam'],
			argsCode: ['s', 'n'],
			m: exports.yo.floodBuffer,
			desc: 'Sends the specified number of yos to the given user.'
		},
		{
			names: ['yofp', 'yofloodprogress'],
			argsCode: 0,
			m: exports.yo.floodProgress,
			desc: 'Logs all of your current yo flood victims and the number of yos that have yet to be sent to them.'
		},
		{
			names: ['d', 'dance'],
			argsCode: ['n', 'n'],
			m: exports.misc.dance,
			desc: 'Prints a dance in chat, with the specified number of steps and at the specified speed.'
		},
		{
			names: ['help'],
			argsCode: ['s'],
			m: exports.gen.help,
			desc: 'Prints information about the given command in chat. It first prints all argument types in order. Then, it prints all of the commands names. If the command has no other names, it will print nothing. All names will be lowercase, but case does not matter in the call. It then prints a description of the function. The description should print the purposes of all arguments, and mention the arguments in the order that they are needed in the function call.'
		},
		{
			names: ['set'],
			argsCode: ['s', 'a'],
			m: exports.userDataFunctions.set,
			desc: 'Sets the user\'s variable to the specified value.'
		},
		{
			names: ['get'],
			argsCode: ['s', 's'],
			m: exports.userDataFunctions.get,
			desc: 'Gets the user\'s variable of the given name'
		},
		{
			names: ['remove', 'rm'],
			argsCode: ['s'],
			m: exports.userDataFunctions.remove,
			desc: 'Erases the specified value on the user\'s profile.'
		},
		{
			names: ['profile'],
			argsCode: ['s'],
			m: exports.userDataFunctions.prof,
			desc: 'Prints out the given user\'s profile'
		},
		{
			names: ['vigenere', 'encrypt2', 'e2', 'ev'],
			argsCode: ['s', 'a'],
			m: exports.crypt.vigenere,
			desc: 'Encrypts the second argument using vigenre\'s cipher with the first argument as the key.'
		},
		{
			names: ['caesar', 'encrypt', 'e', 'ec'],
			argsCode: ['n', 'a'],
			m: exports.crypt.sayCaesar,
			desc: 'Encrypts the second argument using a caesar cipher using the first argument, a number, as the key.'
		},
		{
			names: ['hex', 'decimaltohex', 'dtoh'],
			argsCode: ['n'],
			m: exports.crypt.decimalToHex,
			desc: 'Takes a positive, decimal integer and converts it to its hexidecimal equivalent.'
		},
		{
			names: ['hexstring'],
			argsCode: ['a'],
			m: exports.crypt.stringToHex,
			desc: 'Takes a string and converts it to hexidecimal'
		},
		{
			names: ['friend'],
			argsCode: ['s'],
			m: exports.userDataFunctions.friend,
			desc: 'Adds a nick to your list of friends. Only friends can see your private posts.'
		},
		{
			names: ['unfriend'],
			argsCode: ['s'],
			m: exports.userDataFunctions.unfriend,
			desc: 'Removes a nick to your list of friends. Only friends can see your private posts.'
		}
	]
};

//Get the function associated with the given name
exports.getFunction = function (name) {
	for (var i = 0; i < exports.config.commands.length; i++) {
		var names = exports.config.commands[i].names;
		for (var j = 0; j < names.length; j++) {
			if (names[j] == name) return i;
		}
	}
	return -1;
}
