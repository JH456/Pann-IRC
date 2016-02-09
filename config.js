/*
*	Author: Jim Harris
*	Config file for Pann-IRC
*	Includes all modules and bot info (responses, server and channel info,
*   command info)
*/

var cryptography = require('./cryptography.js');
var gen = require('./gen.js');
var math = require('./math.js');
var misc = require('./misc.js');
var userDataFunctions = require('./userData.js');
var userDataFile = require('./userData.json');
var yo = require('./yo.js');


exports.data = {
    userData: userDataFile,
    yoToken: 'Insert your YO API token here',
    floodProgress: [],
	responseConfig: [
		{
			triggers: ['oman'],
			response: 'yemen'
		}
	],
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
}

exports.config = {
	botName: 'Pann',
    nickservMessage: 'identify password',
	servers: [
		{
			serverName: 'irc.something.net',
			channels: [
				'#channel1',
                '#channel2'
			]
		}
	],
	commands: [
        {
            names: ['l', 'ls', 'list'],
            functions: [
                {
                    argsCode: 0,
                    funcRef: gen.list
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Lists all responses and their trigger phrases.'
        },
        {
            names: ['r', 'repeat'],
            functions: [
                {
                    argsCode: ['a Sentence'],
                    funcRef: gen.repeat
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Repeats the given string.'
        },
        {
            names: ['ma', 'mathadd', 'add'],
            functions: [
                {
                    argsCode: ['n First Number', 'n Second Number'],
                    funcRef: math.add
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Adds two numbers.'
        },
        {
            names: ['ms', 'mathsubtract', 'subtract'],
            functions: [
                {
                    argsCode: ['n First Number', 'n Second Number'],
                    funcRef: math.subtract
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Subtracts the second number from the first number.'
        },
        {
            names: ['mm', 'mathmultiply', 'multiply'],
            functions: [
                {
                    argsCode: ['n First Number', 'n Second Number'],
                    funcRef: math.multiply
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Multiplies two numbers.'
        },
        {
            names: ['md', 'mathdivide', 'divide'],
            functions: [
                {
                    argsCode: ['n First Number', 'n Second Number'],
                    funcRef: math.divide
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Divides the first number by the second number.'
        },
        {
            names: ['yol', 'yolist'],
            functions: [
                {
                    argsCode: 0,
                    funcRef: yo.list
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Tells you how many yo subscribers you have.'
        },
        {
            names: ['yo'],
            functions: [
                {
                    argsCode: ['s Username'],
                    funcRef: yo.yoTrue
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Sends a Yo to the given username.'
        },
        {
            names: ['yof', 'yoflood', 'yospam'],
            functions: [
                {
                    argsCode: ['s Username', 'i Number of Yos'],
                    funcRef: yo.floodBuffer
                }
            ],
            allowedUsers: 'ID',
            desc: 'Sends the specified number of Yos to the given username.'
        },
        {
            names: ['yofp', 'yofloodprogress'],
            functions: [
                {
                    argsCode: 0,
                    funcRef: yo.floodProgress
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Reports the status of Yo floods.'
        },
        {
            names: ['d', 'dance'],
            functions: [
                {
                    argsCode: ['i Number of Steps', 'n Frequency'],
                    funcRef: misc.dance
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Dances for an integer of steps, at some number frequency.'
        },
        {
            names: ['help'],
            functions: [
                {
                    argsCode: ['s Command Name'],
                    funcRef: gen.help
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Prints out a help message for the given command.'
        },
        {
            names: ['set'],
            functions: [
                {
                    argsCode: ['s Variable Name', 'a Value'],
                    funcRef: userDataFunctions.set
                }
            ],
            allowedUsers: 'ID',
            desc: 'Sets a user variable. private_ prefixes private variables.'
        },
        {
            names: ['get'],
            functions: [
                {
                    argsCode: ['s Nick', 's Variable Name'],
                    funcRef: userDataFunctions.get
                }
            ],
            allowedUsers: 'ID',
            desc: 'Get a user profile variable.'
        },
        {
            names: ['remove', 'rm'],
            functions: [
                {
                    argsCode: ['s Variable Name'],
                    funcRef: userDataFunctions.remove
                }
            ],
            allowedUsers: 'ID',
            desc: 'Deletes a user profile variable.'
        },
        {
            names: ['profile'],
            functions: [
                {
                    argsCode: ['s Nick'],
                    funcRef: userDataFunctions.prof
                }
            ],
            allowedUsers: 'ID',
            desc: 'Sends a user profile via private message.'
        },
        {
            names: ['vigenere', 'encrypt2', 'e2', 'ev'],
            functions: [
                {
                    argsCode: ['s Key', 'a Sentence'],
                    funcRef: cryptography.vigenere
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Encrypts a sentence with vigenere\'s cipher.'
        },
        {
            names: ['caesar', 'encrypt', 'e', 'ec'],
            functions: [
                {
                    argsCode: ['i Key', 'a Sentence'],
                    funcRef: cryptography.sayCaesar
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Encrypts a sentence with the caesar cipher.'
        },
        {
            names: ['hex', 'decimaltohex', 'dtoh'],
            functions: [
                {
                    argsCode: ['i Number'],
                    funcRef: cryptography.decimalToHex
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Converts a decimal number into hexadecimal.'
        },
        {
            names: ['hexstring'],
            functions: [
                {
                    argsCode: ['a Sentence'],
                    funcRef: cryptography.stringToHex
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Converts a string into its hexcodes.'
        },
        {
            names: ['friend'],
            functions: [
                {
                    argsCode: ['s Nick'],
                    funcRef: userDataFunctions.friend
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Adds a user to your friends list, who can see private posts.'
        },
        {
            names: ['unfriend'],
            functions: [
                {
                    argsCode: ['s Nick'],
                    funcRef: userDataFunctions.unfriend
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Removes a friend from your friends list.'
        },
        {
            names: ['login'],
            functions: [
                {
                    argsCode: 0,
                    funcRef: gen.login
                }
            ],
            allowedUsers: 'ALL',
            desc: 'Logs the user in.'
        }
	]
};

