/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User'),
	/**
	 * @type {import('../utils/schemas/Tag').TagModel}
	 */
	Tag = require('../utils/schemas/Tag'),
	/**
	 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
	 */
	Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that deletes the account.
 *
 * @param {String} profile_id
 */
const deleteAccount = async (profile_id) => {
	try {
		await Promise.all([
			Bookmark.deleteMany({ profile_id: profile_id }).exec(),
			Tag.deleteMany({ profile_id: profile_id }).exec(),

			User.findOneAndDelete({ profile_id: profile_id }).exec(),
		])

		mixpanel.people.delete_user(profile_id)

		return { deleteStatus: true }
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = deleteAccount
