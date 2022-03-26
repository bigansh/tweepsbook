const { ETwitterStreamEvent } = require('twitter-api-v2')

const twtrClient = require('../utils/auth/oauth2.0')

const { add } = require('../utils/rules/streamRules')

/**
 * A function that filters the tweet stream based on a keyword.
 *
 */

const streamBot = async () => {
	try {
		await twtrClient.v2.updateStreamRules({
			add: add,
		})

		const stream = await twtrClient.v2.searchStream()

		stream.autoReconnect = true
		stream.keepAliveTimeoutMs = Infinity

		const tweets = stream.on(ETwitterStreamEvent.Data, (tweets) => tweets)
	} catch (error) {
		console.log(error)
	}
}

module.exports = streamBot
