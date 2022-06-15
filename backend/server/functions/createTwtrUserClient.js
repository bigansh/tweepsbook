const tokenFind = require('./tokenFind'),
	twtrUserClient = require('./twtrUserClient')

/**
 * A function that creates a Twitter client for a particular user.
 *
 * @param {String} profile_id
 */
const createTwtrUserClient = async (profile_id) => {
	try {
		const { twitter_auth_tokens } = await tokenFind(profile_id)

		return twtrUserClient(
			profile_id,
			twitter_auth_tokens.refreshToken,
			twitter_auth_tokens.accessToken
		)
	} catch (error) {
		throw new Error(error, {
			statusCode: 500,
		})
	}
}

module.exports = createTwtrUserClient
