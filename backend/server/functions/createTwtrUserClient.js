const tokenFind = require('./tokenFind'),
	twtrUserClient = require('./twtrUserClient')

/**
 * A function that creates a Twitter client for a particular user.
 *
 * @param {String} profile_id
 */
const createTwtrUserClient = async (profile_id) => {
	try {
		const { refreshToken } = await tokenFind(profile_id)

		return twtrUserClient(profile_id, refreshToken)
	} catch (error) {
		console.log(error)
	}
}

module.exports = createTwtrUserClient
