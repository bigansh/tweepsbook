/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that sends data for a particular public bookmark.
 *
 * @param {String} bookmarkId
 */
const publicBookmark = async (bookmarkId) => {
	try {
		const bookmark = await Bookmark.findById(bookmarkId)
			.populate('tags')
			.lean()
			.exec()

		if (!bookmark.share)
			throw new Error(`The user has not made the bookmark public.`)

		mixpanel.track('Fetch public bookmark', {
			distinct_id: bookmark.profile_id,
			bookmarkId: bookmarkId,
		})

		return bookmark
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = publicBookmark
