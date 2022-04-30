const Tweet = require('../utils/schema/Tweet')

/**
 * A function that finds the tweet & updates its meta.
 *
 * @param {String} tweetId
 * @param {[]} tags
 * @param {String} type
 */
const tweetFinderAndUpdater = async (
	tweetId,
	tags = undefined,
	type = undefined
) => {
	const foundTweet = await Tweet.findById(tweetId).exec()

	if (type === 'tag') {
		foundTweet.tags = tags

		foundTweet.save()
	}

	return foundTweet
}

module.exports = tweetFinderAndUpdater
