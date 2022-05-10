const User = require('../utils/schemas/User')

/**
 * A function that deletes the account.
 *
 * @param {String} profile_id
 */
const deleteAccount = async (profile_id) => {
	try {
		return await User.findOneAndDelete({ profile_id: profile_id }).exec()
	} catch (error) {
		console.log(error)
	}
}

module.exports = deleteAccount
