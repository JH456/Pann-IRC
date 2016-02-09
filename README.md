# Pann-IRC

## Description

A modular, multichannel JavaScript IRC Bot.

## Contents
* Dependencies
* Architecture
* Configuration and Setup
* Base Modules

## Dependencies
The core functionality of Pann-IRC depends on the node package, **irc**. However, the Yo module also depends on the **request** package.

## Architecture
Three main files lie at the core of the bot's functionality: pann.js, config.js, and argFunctions.js. The base modules only add functionality.

### pann.js
* Main point of entry for the program.
* Creates the bot and connects it to a server and has it join the channels specified in the config object inside of config.js.
* Sends a message in the config to NickServ.
* Creates listeners to scan text for commands or response triggers.
* Calls commands when they are found in a message.
* Creates a listener for WHOIS messages that adds and removes users to/from the registry of users that identified with NickServ.

### config.js
* Declares all modules.
* Contains a data object that contains data that modules may need to access, such as API tokens or just general cached data. This object is shared between all the bots on a network.
* Contains a config object. This is where information like the bot's name, the NickServ message, and the server/channel lists are stored. Also contains a section for adding commands. The nuances are outlined in the **Configuration** section.

### argFunctions.js
* Contains functions for calling functions linked to commands and throwing errors based on improper arguments.

## Configuration
Pann-IRC is highly extensible. The only limit is yourself. It comes with several **Base Modules**, but you may want to add your own! This section gives you instructions for adding custom modules, which is a quick and easy process.

* Step 1) Create a file in the same directory as all the others. For the sake of the example, call it helloWorld.js
* Step 2) Inside of helloWorld.js, create a function like this:

  `exports.helloWorld = function(data, args, info) {
      data.bot.say(info.channel, 'Hello world!')
  }`

  * The exports part is neccessary for making the function callable outside the module.
  * The field data is an object for storing general data that a function may need access to. A good example is the bot object.
  * data is also good for storing runtime data that a function may need access to later, such as user login data.
  * args is an array the arguments that the arguments for your function, formatted as either a number or a String.
  * info is an object that contains information specific to the calling message from the user in the channel.
  * info contains things such as the channel name and nick of the calling user. See the handleMessage in pann.js for more.
* Step 3) Add the following line to the top of config.js to declare the module.
* 
  `var helloWorld = require('./helloWorld.js');`

* Step 4) Go into the commands array of the config object and add the following element at the top:

  `{
      names: ['hello'],
      functions: [
          {
              argsCode: 0,
              funcRef: helloWorld.helloWorld
          }
      ],
      allowedUsers: 'ALL',
      desc: 'Says hello!'
  }`

  * Doing this creates a new function that can be called in irc with *hello. Adding additional strings to the names array gives the command aliases. argsCode: 0 specifies that the command takes no arguments. If it takes arguments, it should take arguments in the form of an array, such as argsCode: ['s string', 'n number', 'i integer', 'a sentence']. The first character represents the data type that argFunctions should try to format the argument to you (these are what args are in the function itself), and the words following are a description to be printed out when *help commandName is called. allowedUsers should be set to 'ALL', 'ID' (if only users that identified with NickServ can use this command), or an array of nicks. desc is just a String to be printed when *help commandName is called.
* Step 5) Go in IRC and try it out! Type in *hello and Pann should shout 'Hello World' at you! For additional examples, see the command definitions for some of the base commands.

## Base Modules

### gen.js
For very simple or generic commands. This is where the login command and the help commands are stored for example. It is highly reccommended that you keep this module as a part of the bot.

### cryptography.js
Contains some simple cryptography functions.

### math.js
Basic math calculations.

### misc.js
For things that do not really fit in anywhere else. This is where the dance function is located.

### userData.js
Basic social network system. Stores user data in the file userData.json. Good for if you want to make profiles for people on your network and build a good sense of community.

### yo.js
Sends Yos to people. Can also send ALOT of Yos to people.
