const { TweetEntityHashtagV2, TweetV2 } = require('twitter-api-v2')

const tagFindOrCreate = require('./tagFindOrCreate'),
	tweetCreate = require('./tweetCreate')

/**
 * A function to bookmark a tweet with the specified tags.
 *
 * @param {} user
 * @param {String} requestedTweetId
 * @param {TweetEntityHashtagV2[]} tags
 */
const bookmark = async (user, requestedTweetId, tags = null) => {
	try {
		if (
			user.unreadCount >=
			user.tweets.filter(({ read }) => read === false).length()
		)
			return false

		let tweetTags = []

		if (tags.length)
			for (const { tag } of tags) {
				const savedTag = await tagFindOrCreate(tag, user)

				tweetTags.push(savedTag)
			}

		const savedTweet = await tweetCreate(
			user.profile_id,
			requestedTweetId,
			tweetTags
		)

		user.tweets.push(savedTweet)

		user.save()

		return true
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

module.exports = bookmark
