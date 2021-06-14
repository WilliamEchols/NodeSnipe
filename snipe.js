const request = require('request');
const prompt = require('prompt-sync')();
const reference = require('./reference')

const init = async () => {
	console.log(reference.pingCheck)

	// init style
	var programName = [
		"mc sniper bot"
	]
	for(i = 0; i < programName.length; i++) {
		console.log(programName[i])
	}

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
		var ping = reference.pingCheck

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

}


init()
