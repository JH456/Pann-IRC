# Pann-IRC

## Description

A simple JavaScript IRC Bot. Makes use of the irc and request npm packages. Also implements the YO API.

##Features

###Config
An administrator can manage Pann's config to add implementations for new commands and responses. The syntax is easy, and the built in commands give many examples.

###Yo
Uses the Yo API to send Yo's to people with the app. Pann can only send Yo's to those who have sent him a Yo before. Can also send a stream of Yo's to a user. Can only send one Yo per user per minute as specified by the API.

###Dance
You can ask Pann do dance for you in chat at a specified speed for a specified number of steps;
\o\
/o/
\o/

###Math
####Basic Arithmetic
Pann can add, subtract, multiply, and divide numbers. More advanced operations may be coming soon.

###Responses
Pann can be programmed in this config file to respond certain ways to certain phrases he hears in chat.

###Social Networking
Pann can store and produce user data in a fashion as to make him act as a 'text based social network.' This functionality is still in beta, but works relatively well so far.
####Friends
People who use Pann's social networking functionality can set/remove friends from a friends list. Only friends can see private posts that you create (attributes set with the private_ prefix).
####Profiles
Every user has a profile that can be requested by other users from Pann. This shows them all attributes (posts) that that user has set (with the exception of private_ attributes, if the user who requested the profile is not a friend). Profiles are sent via PM.

###Cryptography
####Caesar Cipher
Pann can encrypt sentences using a caesar cipher and a specified key.
####Vigenere's Cipher
Pann can encrypt sentences using Vingere's cipher and a specified key.
####Hexadecimal conversion
Can translate decimal numbers into hex, and can convert strings into hexstrings.

###Help
Pann can produce help messages in case people forget the syntax for a command.
