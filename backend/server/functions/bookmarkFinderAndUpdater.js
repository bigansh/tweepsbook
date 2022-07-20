/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that finds the tweet & updates its meta.
 *
 * @param {String} bookmarkId
 * @param {import('../utils/schemas/Tag').TagDocument[]} tags
 * @param {String} tagId
 * @param {String} profile_id
 */
const bookmarkFinderAndUpdater = async (
	bookmarkId = undefined,
	tags = undefined,
	profile_id = undefined,
	tagId = undefined
) => {
	try {
		mixpanel.track('Update bookmark tags', {
			distinct_id: profile_id,
			bookmark_id: bookmarkId,
		})

		if (profile_id && tagId) {
			const userBookmarks = await Bookmark.find({
				profile_id: profile_id,
			}).exec()

			for (const bookmark of userBookmarks) {
				const tagIndex = bookmark.tags.indexOf(tagId)

				bookmark.tags.splice(tagIndex, 1)

				await bookmark.save()
			}

			return
		}

		if (tags !== null && bookmarkId) {
			const foundBookmark = await Bookmark.findById(bookmarkId).exec()

			foundBookmark.tags = tags

			return await foundBookmark.save()
		}
	} catch (error) {
		throw error
	}
}

module.exports = bookmarkFinderAndUpdater
