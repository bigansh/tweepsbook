const Tweet = require('../utils/schema/Tweet')

/**
 * A function that finds the tweet & updates its meta.
 *
 * @param {String} tweetId
 * @param {[]} tags
 * @param {String} type
 * @param {String} profile_id
 */
const tweetFinderAndUpdater = async (
	tweetId = undefined,
	tags = undefined,
	profile_id = undefined,
	tagId = undefined
) => {
	try {

		if (tags.length && tweetId) {
			const foundTweet = await Tweet.findById(tweetId).exec()

			foundTweet.tags = tags

			return await foundTweet.save()
		}

		if(profile_id && tagId) {
			const userTweets = await Tweet.find({profile_id: profile_id}).exec()

			userTweets.forEach((tweet) => {
				const tagIndex = tweet.tags.indexOf(tagId)

				tweet.tags.splice(tagIndex, 1)
			})

			userTweets.save()
		}

	} catch (error) {}
}

module.exports = tweetFinderAndUpdater
