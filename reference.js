const ping = require('jjg-ping')
const axios = require('axios')

const asciiName = async () => {
	var ascii = [

		"_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_			",
		" _   _           _         _____       _                  			",
		"| \\ | |         | |       / ____|     (_)                			",
		"|  \\| | ___   __| | ___  | (___  _ __  _ _ __   ___ _ __ 			",
		"| . ` |/ _ \\ / _` |/ _ \\  \\___ \\| '_ \\| | '_ \\ / _ \\ '__|	",
		"| |\\  | (_) | (_| |  __/  ____) | | | | | |_) |  __/ |   			",
		"|_| \\_|\\___/ \\__,_|\\___| |_____/|_| |_|_| .__/ \\___|_|   		",
		"					| |               								",
		"					|_|               								",
		"_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_			"

	]
	for(var i = 0; i < ascii.length; i++) {
		console.log(ascii[i])
	}		 
}

const terminalSeparator = async () => {
	console.log("_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_-_")
}

const pingCheck = async () => {
	ping.system.ping('minecraft.net', function(latency, status) {
		return latency
	})
}

const waitTime = async (username) => {
	var query = await axios.get(`https://mojang-api.teun.lol/droptime/${username}`).catch(err => {
		throw err.response
	})

	return new Date(query.data.UNIX * 1000)
}

module.exports = {
	asciiName,
	terminalSeparator,
	pingCheck,
	waitTime
}
