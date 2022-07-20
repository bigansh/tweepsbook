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

		if (profile_id === bookmark.profile_id) {
			mixpanel.track('Fetch bookmark', {
				distinct_id: profile_id,
				bookmarkId: bookmark._id,
			})

			return { bookmark: bookmark, ownershipStatus: true }
		}

		if (profile_id !== bookmark.profile_id) {
			if (!bookmark.share)
				throw new Error(`The user has not made the bookmark public.`)

			mixpanel.track('Fetch public bookmark', {
				distinct_id: bookmark.profile_id,
				bookmarkId: bookmarkId,
			})

			return { bookmark: bookmark, ownershipStatus: false }
		}
	} catch (error) {
		throw error
	}
}

module.exports = fetchBookmark
