const ping = require('jjg-ping')
const axios = require('axios')
const schedule = require('node-schedule');
const request = require('request')
const prompt = require('prompt-sync')();

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

const snipe = async (username, accessToken, waitTime) => {
	// Attempt to snipe username with API

	var executeSnipe = schedule.scheduleJob(waitTime, function(){
		for(let i = 0; i < 6; i++) {
			request.put({url:`https://api.minecraftservices.com/minecraft/profile/name/${username}`, headers: {'Authorization': `Bearer ${accessToken}`}}, function(err,httpResponse,body){
				if(body['name'] == 'username') {
					console.log('Sucessfully sniped ' + body['name'] + ' on ' + email)
				} else {
					console.log('Failed to snipe: ' + body['errorMessage'])
				}
			})
		}
	});

	var stopSnipe = prompt("Type 'stop' to end snipe: ")
	if(stopSnipe == 'stop') {
		executeSnipe.cancel()
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
	snipe,
	terminalSeparator,
	pingCheck,
	waitTime
}
