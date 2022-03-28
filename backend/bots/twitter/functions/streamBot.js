const {
	ETwitterStreamEvent,
	TweetV2SingleStreamResult,
	TweetStream,
} = require('twitter-api-v2')

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

		/**
		 * @type {TweetStream<TweetV2SingleStreamResult>}
		 */
		const stream = await twtrClient.v2.getStream('tweets/search/stream', {
			'tweet.fields': 'referenced_tweets',
			'tweet.fields': 'entities',
			expansions: ['author_id', 'referenced_tweets.id'],
		})

		stream.autoReconnect = true
		stream.keepAliveTimeoutMs = Infinity

		stream.on(ETwitterStreamEvent.Data, ({ data, includes }) => {
			console.log(data.text, 'text')
			console.log(data.author_id, 'author')
			console.log(includes.tweets, 'tweet')
			console.log(data.entities.hashtags, 'tags')
		})
	} catch (error) {
		console.log(error)
	}
}

module.exports = streamBot
