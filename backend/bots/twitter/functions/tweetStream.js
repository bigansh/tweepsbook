const {
	ETwitterStreamEvent,
	TweetV2SingleStreamResult,
	TweetStream,
} = require('twitter-api-v2')

const twtrClient_o2 = require('../utils/auth/oauth2.0')

const { add } = require('../utils/rules/streamRules')

const userFind = require('./userFind'),
	tweetReply = require('./tweetReply'),
	bookmark = require('./bookmark')

/**
 * A function that filters the tweet stream based on a keyword.
 */
const tweetStream = async () => {
	try {
		await twtrClient_o2.v2.updateStreamRules({
			add,
		})

		/**
		 * @type {TweetStream<TweetV2SingleStreamResult>}
		 */
		const stream = await twtrClient_o2.v2.getStream(
			'tweets/search/stream',
			{
				'tweet.fields': 'entities',
				expansions: ['author_id', 'referenced_tweets.id'],
			}
		)

		console.log('Tweet stream online!')

		stream.autoReconnect = true
		stream.keepAliveTimeoutMs = Infinity

		stream.on(
			ETwitterStreamEvent.Data,
			async ({ data, includes, matching_rules }) => {
				if (data.author_id === '1501493026358583299') return

				const user = await userFind(data.author_id)

				if (user) {
					let state

					if (matching_rules[0].tag.includes('bookmark'))
						state = await bookmark(
							user,
							includes.tweets[0].id,
							'Reply',
							data.entities.hashtags
						)

					tweetReply(data.id, state)
				} else if (!user) tweetReply(data.id, false)
			}
		)
	} catch (error) {
		console.log(error)
	}
}

module.exports = tweetStream
