/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that returns the found bookmark's owner.
 *
 * @param {String} bookmarkId
 */
const findBookmarkOwner = async (bookmarkId) => {
	try {
		const foundBookmark = await Bookmark.findById(bookmarkId)
			.select('profile_id')
			.lean()
			.exec()

		return foundBookmark.profile_id
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = findBookmarkOwner
