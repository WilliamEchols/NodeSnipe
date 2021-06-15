const request = require('request');
const prompt = require('prompt-sync')();
const reference = require('./reference')


// development library
const util = require('util')
const devMode = true

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
	var pingAvg = await reference.pingCheck()


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
	if(!devMode) {
		request.post({url:'https://authserver.mojang.com/authenticate', json: {"agent": {"name": "Minecraft", "version": 1},"username": email,"password": pw}}, function(err,httpResponse,body){
			if(body['accessToken'] == null) {
				console.log('Error: access token could not be aquired')
			} else {
				console.log('Authentication successful')
				accessToken = body['accessToken']
			}

		})
	} else {
		accessToken = 'blahblahblah'
	}

	// Final confirmation
	reference.terminalSeparator()
	console.log('Final Confirmation: ')
	console.log('	Account email:		' + email)
	console.log('	Delay:			' + delay)
	console.log('	Targeted Username:	' + username)

	// Fact in delay in waitTime after delay confirmation
	waitTime = new Date(waitTime - delay);

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

	var launchTime = new Date()

	console.log('Status: Ready')
	console.log('Availability Time: ' + waitTime)
	
	var timeDiffEpoch = Math.abs(waitTime.getTime() - launchTime.getTime())

	var timeDiffDays = Math.floor(timeDiffEpoch / (1000 * 60 * 60 * 24))
	timeDiffEpoch -= timeDiffDays * (1000 * 60 * 60 * 24)

	var timeDiffHours = Math.floor(timeDiffEpoch / (1000 * 60 * 60))
	timeDiffEpoch -= timeDiffHours * (1000 * 60 * 60)

	var timeDiffMinutes = Math.floor(timeDiffEpoch / (1000 * 60))
	timeDiffEpoch -= timeDiffMinutes * (1000 * 60)

	var timeDiffSeconds = Math.floor(timeDiffEpoch / 1000)
	timeDiffEpoch -= timeDiffSeconds * (1000)

	console.log(`Time until Availability Time at Launch: ${timeDiffDays} days ${timeDiffHours} hours ${timeDiffMinutes} minutes ${timeDiffSeconds} seconds `)
	console.log('Factored delay: ' + delay)
	console.log('Target: ' + username)
	console.log('Account: ' + email)
	if(accessToken != null) {
		console.log('Access token: Acquired')
	} else {
		console.log('Access token: Failed - Please try again')
	}

	reference.terminalSeparator()

	// Execute sniper
	
	reference.snipe()
}


init()
