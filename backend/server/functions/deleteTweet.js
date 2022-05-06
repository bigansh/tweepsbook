const Tweet = require('../utils/schema/Tweet')

/**
 * A function that finds a tweet & then deletes it.
 *
 * @param {String} tweetId
 */
const deleteTweet = async (tweetId) => {
	try {
		return await Tweet.findByIdAndDelete(tweetId).exec()
	} catch (error) {}
}

module.exports = deleteTweet
