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
		const stream = await twtrClient_o2.v2.getStream('tweets/search/stream', {
			'tweet.fields': 'entities',
			expansions: ['author_id', 'referenced_tweets.id'],
		})

		console.log('Tweet stream online!')

		stream.autoReconnect = true
		stream.keepAliveTimeoutMs = Infinity

		stream.on(
			ETwitterStreamEvent.Data,
			async ({ data, includes, matching_rules }) => {
				// TODO Define user type
				/**
				 * @type {}
				 */
				const user = await userFind(data.author_id)

				if (user) {
					if (matching_rules[0].tag.includes('bookmark'))
						bookmark(user[0], includes.tweets[0].id, data.entities.hashtags)

					tweetReply(data.id, true)
				} else if (!user) tweetReply(data.id, false)

				// * For reference
				// console.log(data.text, 'text')
				// console.log(data.id, 'id')
				// console.log(data.author_id, 'author')
				// console.log(includes.tweets, 'tweet')
				// console.log(data.entities.hashtags, 'tags')
			}
		)
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

module.exports = tweetStream
