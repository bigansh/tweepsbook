/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that fetches the account information.
 *
 * @param {String} profile_id
 */
const fetchAccount = async (profile_id) => {
	try {
		mixpanel.track('Fetch account details', {
			distinct_id: profile_id,
		})

		return await User.findOne({ profile_id: profile_id }).lean().exec()
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = fetchAccount
