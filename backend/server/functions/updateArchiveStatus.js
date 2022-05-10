const Tweet = require('../utils/schemas/Tweet')

/**
 * A function that updates the archive status of a bookmark.
 *
 * @param {String} tweetId
 * @param {Boolean} status
 */
const updateArchiveStatus = async (tweetId = undefined, status) => {
	try {
		if (tweetId)
			return await Tweet.findByIdAndUpdate(
				tweetId,
				{ archived: status },
				{ new: true }
			).exec()
	} catch (error) {
		console.log(error)
	}
}

module.exports = updateArchiveStatus
