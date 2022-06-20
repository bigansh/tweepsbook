/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that sends data for a particular bookmark.
 *
 * @param {String} profile_id
 * @param {String} bookmarkId
 */
const fetchBookmark = async (profile_id, bookmarkId) => {
	try {
		const bookmark = await Bookmark.findById(bookmarkId)
			.populate('tags')
			.lean()
			.exec()

		mixpanel.track('Fetch bookmark', {
			distinct_id: profile_id,
			bookmarkId: bookmark._id,
		})

		return bookmark
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = fetchBookmark
