const ping = require('jjg-ping')
const axios = require('axios')

const pingCheck = () => {
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
	pingCheck,
	waitTime
}
