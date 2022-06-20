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
const updateTags = async (profile_id, bookmarkId, tags) => {
	try {
		const user = await User.findOne({ profile_id: profile_id })
			.select(['profile_id', 'tags'])
			.exec()

		const bookmarkTags = await tagFindOrCreate(tags, user)

		return await bookmarkFinderAndUpdater(bookmarkId, bookmarkTags)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = updateTags
