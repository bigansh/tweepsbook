/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

const mixpanel = require('../utils/auth/mixpanelConnect')

const bookmarkFinderAndUpdater = require('./bookmarkFinderAndUpdater')

/**
 * A function that deletes the tag & removes it from all the bookmarks.
 *
 * @param {String} tagId
 * @param {String} profile_id
 */
const deleteTag = async (tagId, profile_id) => {
	try {
		await bookmarkFinderAndUpdater(undefined, undefined, profile_id, tagId)

		mixpanel.track('Delete tag', {
			distinct_id: profile_id,
		})

		await Tag.findByIdAndDelete(tagId).exec()

		return { deleteStatus: true }
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = deleteTag
