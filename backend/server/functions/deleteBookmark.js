/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that finds a bookmark & then deletes it.
 *
 * @param {String} bookmarkId
 * @param {String} profile_id
 */
const deleteBookmark = async (bookmarkId, profile_id) => {
	try {
		await Bookmark.findByIdAndDelete(bookmarkId).exec()

		mixpanel.track('Delete bookmark', {
			distinct_id: profile_id,
			bookmark_id: bookmarkId,
		})

		return { deleteStatus: true }
	} catch (error) {
		throw error
	}
}

module.exports = deleteBookmark
