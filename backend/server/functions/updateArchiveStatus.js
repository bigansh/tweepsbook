const Tweet = require('../utils/schema/Tweet')

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
	} catch (error) {}
}

module.exports = updateArchiveStatus
