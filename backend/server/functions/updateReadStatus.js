/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that updates the read status of a bookmark.
 *
 * @param {String} bookmarkId
 * @param {Boolean} status
 * @param {String} profile_id
 */
const updateReadStatus = async (bookmarkId = undefined, status, profile_id) => {
	try {
		if (bookmarkId) {
			mixpanel.track('Update read status', {
				distinct_id: profile_id,
				bookmark_id: bookmarkId,
			})

			return await Bookmark.findByIdAndUpdate(
				bookmarkId,
				{ read: status },
				{ new: true }
			)
				.lean()
				.exec()
		}
	} catch (error) {
		throw new Error(error, {
			statusCode: 502,
		})
	}
}

module.exports = updateReadStatus
