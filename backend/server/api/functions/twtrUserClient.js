require('dotenv').config()

const { TwitterApi } = require('twitter-api-v2')
const {
	TwitterApiAutoTokenRefresher,
} = require('@twitter-api-v2/plugin-token-refresher')
const {
	TwitterApiRateLimitPlugin,
} = require('@twitter-api-v2/plugin-rate-limit')

const User = require('../utils/schema/User')

/**
 * A function that returns the user client with the latest access tokens.
 * 
 * @param {String} twitter_id 
 * @param {String} accessToken 
 * @param {String} refreshToken 
 * @returns 
 */
const twtrUserClient = (twitter_id, accessToken, refreshToken) => {
	const rateLimitPlugin = new TwitterApiRateLimitPlugin()

	const tokenRefreshPlugin = new TwitterApiAutoTokenRefresher({
		refreshToken: refreshToken,
		refreshCredentials: {
			clientId: process.env.CONSUMER_KEY_TWITTER_MAIN,
			clientSecret: process.env.CONSUMER_SECRET_TWITTER_MAIN,
		},
		onTokenUpdate(token) {
			User.findOneAndUpdate({twitter_id}, {
				twitter_auth_tokens: {
					accessToken: token.accessToken,
					refreshToken: token.refreshToken
				}
			})
		},
	})

	return new TwitterApi(accessToken, {
		plugins: [rateLimitPlugin, tokenRefreshPlugin],
	})
}

module.exports = twtrUserClient
