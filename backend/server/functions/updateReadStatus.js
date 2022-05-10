const Tweet = require('../utils/schemas/Tweet')

/**
 * A function that updates the read status of a bookmark.
 *
 * @param {String} tweetId
 * @param {Boolean} status
 */
const updateReadStatus = async (tweetId = undefined, status) => {
	try {
		if (tweetId)
			return await Tweet.findByIdAndUpdate(
				tweetId,
				{ read: status },
				{ new: true }
			).exec()
	} catch (error) {
		console.log(error)
	}
}

module.exports = updateReadStatus
