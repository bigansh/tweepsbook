/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that fetches bookmarks of a particular user.
 *
 * @param {String} profile_id
 */
const fetchBookmarks = async (profile_id) => {
	try {
		mixpanel.track('Fetch bookmarks', {
			distinct_id: profile_id,
		})

		return await Bookmark.find({ profile_id: profile_id })
			.populate('tags')
			.select('-notes')
			.lean()
			.exec()
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = fetchBookmarks
