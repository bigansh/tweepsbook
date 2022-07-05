/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect'),
	sendgrid = require('../utils/auth/sendgridConnect')

/**
 * A function to save the tweet in the database.
 *
 * @param {String} profile_id
 * @param {String} status_id
 * @param {String} bookmarkMethod
 * @param {import('../utils/schemas/Tag').TagDocument[]} tags
 */
const bookmarkCheckOrCreate = async (
	profile_id,
	status_id,
	bookmarkMethod,
	tags = null
) => {
	try {
		const foundBookmark = await Bookmark.findOne({
			twitter_status_id: status_id,
			profile_id: profile_id,
		}).exec()

		if (!foundBookmark) {
			const createdBookmark = await Bookmark.create({
				profile_id: profile_id,
				twitter_status_id: status_id,
				tags: tags,
				bookmarkSource: 'twitter',
				bookmarkMethod: bookmarkMethod.toLowerCase(),
			})

			mixpanel.track('Create bookmark', {
				distinct_id: profile_id,
				bookmarkId: createdBookmark._id,
				bookmark_type: 'Twitter',
				bookmark_method: bookmarkMethod,
			})

			return createdBookmark
		}
	} catch (error) {
		console.log(error)
	}
}

module.exports = bookmarkCheckOrCreate
