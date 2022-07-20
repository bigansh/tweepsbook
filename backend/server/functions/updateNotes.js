/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

const findBookmarkOwner = require('./findBookmarkOwner')

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
			const ownerId = await findBookmarkOwner(bookmarkId)

			if (ownerId !== profile_id)
				throw new Error(
					'You are not allowed to update a bookmark since you are not the owner of the bookmark.'
				)

			mixpanel.track('Update notes', {
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
		throw error
	}
}

module.exports = updateNotes
