const request = require('request');
const prompt = require('prompt-sync')();
const reference = require('./reference')

// development library
const util = require('util')

const init = async () => {
	// init style
	reference.asciiName()

	// ask user for a username
	const username = prompt('username: ')

	var waitTime = await reference.waitTime(username)
	console.log('Expected time of availability: ' +  waitTime)

	// ask user for number of pings to try
	const pingNum = prompt('number of pings for calibration (max 5): ')
	if(pingNum > 5) {
		pingNum = 5
	}

	// generate automatic connection delay
	var pingList = []
	var pingAvg = 0
	for(var i = 0; i < pingNum; i++) {
		var ping = await reference.pingCheck()

		pingList.push(ping)
		pingAvg += ping

		console.log('individual ping: ' + ping)
	}
	pingAvg = pingAvg/pingNum
	console.log('ping average is ' + pingAvg + 'ms for ' + pingNum + ' latency tests ')

	// Ask for verification for delay
	const confirmation = prompt('Accept as delay? (y/n)')
	var delay = pingAvg
	if(confirmation == "n" || confirmation == "no") {
		delay = prompt('Manual delay: ')
	}

	console.log('Delay: ' + delay + 'ms')
	
	reference.terminalSeparator()

	// Account details
	var email = prompt('Account email: ')
	console.log('Account password:');
	var pw = prompt({echo: '*'});

	// Authentication verification
	var accessToken = ''
	request.post({url:'https://authserver.mojang.com/authenticate', json: {"agent": {"name": "Minecraft", "version": 1},"username": email,"password": pw}}, function(err,httpResponse,body){
		if(body['accessToken'] == null) {
			console.log('Error: access token could not be aquired')
		} else {
			console.log('Authentication successful')
			accessToken = body['accessToken']
		}

	})

	// Final confirmation
	reference.terminalSeparator()
	console.log('Final Confirmation: ')
	console.log('	Account email:		' + email)
	console.log('	Delay:			' + delay)
	console.log('	Targeted Username:	' + username)

	var executeSnipe = false

	var finalConfirmation = prompt('Proceed?(y/n)')
	if(finalConfirmation != "n" && finalConfirmation != "no" && finalConfirmation != "stop") {
		executeSnipe = true
	} else {
		console.log('Snipe has been cancelled on ' + username + ' for ' + email)
	}

	// Reset screen for snipe mode
	console.clear()
	reference.asciiName()

	console.log('Status: Ready')
	console.log('Availability Time: ' + waitTime)
	console.log('Time until Availability Time at Launch ' + waitTime - (delay + Date.now()))
	console.log('Factored delay' + delay)
	console.log('Target: ' + username)
	console.log('Account ' + email)
	if(accessToken != null) {
		console.log('Access token: Acquired')
	} else {
		console.log('Access token: Failed - Please try again')
	}

	reference.terminalSeparator()

}


init()
