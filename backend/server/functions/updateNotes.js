/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that updates the notes of a bookmark.
 *
 * @param {String} bookmarkId
 * @param {String} notes
 * @param {String} profile_id
 */
const updateNotes = async (bookmarkId = undefined, notes, profile_id) => {
	try {
		if (bookmarkId) {
			mixpanel.track('Update read status', {
				distinct_id: profile_id,
				bookmark_id: bookmarkId,
			})

			return await Bookmark.findByIdAndUpdate(
				bookmarkId,
				{ notes: notes },
				{ new: true }
			)
				.lean()
				.exec()
		}
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = updateNotes
