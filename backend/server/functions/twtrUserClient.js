require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2'),
	{
		TwitterApiRateLimitPlugin,
	} = require('@twitter-api-v2/plugin-rate-limit'),
	{
		TwitterApiAutoTokenRefresher,
	} = require('@twitter-api-v2/plugin-token-refresher')

/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that returns the user client with the latest access tokens.
 *
 * @param {String} profile_id
 * @param {String} refreshToken
 * @param {String} accessToken
 * @returns
 */
const twtrUserClient = (profile_id, refreshToken, accessToken) => {
	const rateLimitPlugin = new TwitterApiRateLimitPlugin()

	let clientToken = accessToken

	const tokenRefreshPlugin = new TwitterApiAutoTokenRefresher({
		refreshToken: refreshToken,
		refreshCredentials: {
			clientId: process.env.CLIENT_ID_TWITTER_MAIN,
			clientSecret: process.env.CLIENT_SECRET_TWITTER_MAIN,
		},
		async onTokenUpdate(token) {
			clientToken = token.accessToken

			await User.findOneAndUpdate(
				{ profile_id },
				{
					twitter_auth_tokens: {
						accessToken: token.accessToken,
						refreshToken: token.refreshToken,
					},
				}
			).exec()
		},
	})

	return new TwitterApi(clientToken, {
		plugins: [rateLimitPlugin, tokenRefreshPlugin],
	})
}

module.exports = twtrUserClient
