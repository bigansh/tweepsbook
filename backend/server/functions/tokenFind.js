const User = require('../utils/schemas/User')

/**
 * A function that finds the access & the refresh token of a particular user.
 *
 * @param {String} profile_id
 */
const tokenFind = async (profile_id) => {
	try {
		return await User.findOne({ profile_id })
			.select(['twitter_auth_tokens'])
			.exec()
	} catch (error) {
		console.log(error)
	}
}

module.exports = tokenFind
