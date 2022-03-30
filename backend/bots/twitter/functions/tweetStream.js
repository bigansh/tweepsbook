const {
	ETwitterStreamEvent,
	TweetV2SingleStreamResult,
	TweetStream,
} = require('twitter-api-v2')

const twtrClient = require('../utils/auth/oauth2.0')

const { add } = require('../utils/rules/streamRules')

const findUser = require('./findUser'),
	tweetReply = require('./tweetReply'),
	bookmark = require('./bookmark')

/**
 * A function that filters the tweet stream based on a keyword.
 */

const tweetStream = async () => {
	try {
		await twtrClient.v2.updateStreamRules({
			add,
		})

		/**
		 * @type {TweetStream<TweetV2SingleStreamResult>}
		 */
		const stream = await twtrClient.v2
			.getStream('tweets/search/stream', {
				'tweet.fields': 'referenced_tweets',
				'tweet.fields': 'entities',
				expansions: ['author_id', 'referenced_tweets.id'],
			})
			.then(() => console.log('Stream online!'))

		stream.autoReconnect = true
		stream.keepAliveTimeoutMs = Infinity

		stream.on(
			ETwitterStreamEvent.Data,
			async ({ data, includes, matching_rules }) => {
				// ! Define user type
				/**
				 * @type {User}
				 */
				const user = await findUser(data.author_id)

				if (user) {
					if (matching_rules[0].tag.includes('bookmark'))
						bookmark(user[0], includes.tweets, data.entities.hashtags)

					tweetReply(twtrClient, data.id, true)
				} else if (!user) tweetReply(twtrClient, data.id, false)

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
