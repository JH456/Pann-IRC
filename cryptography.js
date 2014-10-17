exports.decimalToHex = function(data, args) {
	
}

exports.decimalToBinary = function(data, args) {
	
}

exports.stringToHex = function(data, args) {
	
}

exports.caesar = function(rot, phrase, oneChar) {
	var str = phrase;
	var key = rot%26;
	var r = "";

	for (var i = 0; i < str.length; i++) {
		var n = (str.charCodeAt(i));
		var a = n >= 65 && n <= 90 ? 65 : n >= 97 && n <= 122 ? 97 : -1;
		if (a != -1) {
			n += (key);
			if (n > a + 25) {
				n -= 26;
			}	
		}
		else if (oneChar) return 0;
		r += String.fromCharCode(n);
	}
	return r;
}

exports.sayCaesar = function(data, args) {
	data.bot.say(data.channel, exports.caesar(args[0], args[1], false));
}

exports.vigenere = function(data, args) {
	var keyword = args[0];
	var plainText = args[1];
	var r = "";

	var i = 0;

	var j = 0;

	while (j < plainText.length) {
		
		var k = keyword.charCodeAt(i);
		var z = (k >= 65 && k <= 90) ? 90 : (k >= 97 && k <= 122) ? 122 : k+25;
		var p = plainText.charCodeAt(j);
		//r += exports.caesar(keyword.charCodeAt(i), plainText.substring(j, j+1), false);
		if (z == 90 || z == 122) {
			//var z = keyword.charCodeAt(i) >= 65 && keyword.charCodeAt(i) <= 90 ? 90 : keyword.charCodeAt(i) >= 97 && keyword.charCodeAt(i) <= 122 ? 122 : -1;
			r += exports.caesar(26-(z-keyword.charCodeAt(i)), plainText.substring(j, j+1), false);
			i = i >= keyword.length-1 ? 0 : i+1;
		}
		else r += plainText.charAt(j);
		j++;
	}

	data.bot.say(data.channel, r);
}