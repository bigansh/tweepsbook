/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const tagFindOrCreate = require('./tagFindOrCreate'),
	bookmarkFinderAndUpdater = require('./bookmarkFinderAndUpdater')

/**
 * A function that finds the user & updates the tags.
 *
 * @param {String} profile_id
 * @param {String} bookmarkId
 * @param {String[]} tags
 */
const updateTags = async (profile_id, bookmarkId = undefined, tags) => {
	try {
		const user = await User.findOne({ profile_id: profile_id })
			.select(['profile_id'])
			.exec()

		const bookmarkTags = await tagFindOrCreate(tags, user)

		if (bookmarkId)
			return await bookmarkFinderAndUpdater(bookmarkId, bookmarkTags)
	} catch (error) {
		throw new Error(error, {
			statusCode: 502,
		})
	}
}

module.exports = updateTags
