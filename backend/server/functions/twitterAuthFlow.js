require('dotenv').config()

const twtrClient_o2 = require('../utils/auth/oauth2.0')

/**
 * A function to handle the 3-legged authentication for Twitter.
 *
 * @param {String} email
 */
const twitterAuthFlow = (email) => {
	try {
		const { url, codeVerifier, state } =
			twtrClient_o2.generateOAuth2AuthLink(
				`${process.env.HOST}/auth/callback?callbackType=twitter&email=${email}`,
				{
					scope: [
						'users.read',
						'bookmark.read',
						'bookmark.write',
						'offline.access',
						'tweet.read',
					],
				}
			)

		return { url, codeVerifier, state }
	} catch (error) {
		throw error
	}
}

module.exports = twitterAuthFlow
