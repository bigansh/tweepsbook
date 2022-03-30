const { TweetEntityHashtagV2, TweetV2 } = require('twitter-api-v2')

const tagFindOrCreate = require('./tagFindOrCreate'),
	tweetCreate = require('./tweetCreate')

// ! Define user type
/**
 * A function to bookmark a tweet with the specified tags.
 *
 * @param {String} user
 * @param {TweetV2[]} requestedTweet
 * @param {TweetEntityHashtagV2[]} tags
 */

const bookmark = async (user, requestedTweet, tags = null) => {
	try {
		if (tags) {
			tags.forEach(async ({ tag }) => {
				const savedTag = await tagFindOrCreate(tag, user.profile_id)

				if (savedTag) {
					user.tags.push(savedTag)
					user.save()
				}
			})
		}

		const savedTweet = await tweetCreate(
			user.profile_id,
			requestedTweet[0].id,
			tags.map(({ tag }) => tag)
		)

		user.tweets.push(savedTweet)
		user.save()

		return
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

module.exports = bookmark
