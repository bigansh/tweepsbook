const Tweet = require('../utils/schema/Tweet'),
	Tag = require('../utils/schema/Tag')

const tweetFinderAndUpdater = require('./tweetFinderAndUpdater')

/**
 * A function that deletes the tag & removes it from all the bookmarks.
 *
 * @param {String} tagId
 * @param {String} profile_id
 */
const deleteTag = async (tagId, profile_id) => {
	try {
		tweetFinderAndUpdater(undefined, undefined, profile_id, tagId)

		return await Tag.findByIdAndDelete(tagId).exec()
	} catch (error) {}
}

module.exports = deleteTag
