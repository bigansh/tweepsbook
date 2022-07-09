require('dotenv').config()

const twtrClient_o2 = require('../utils/auth/oauth2.0')

/**
 * A function to handle the 3-legged authentication for Twitter.
 */
const twitterAuthFlow = () => {
	try {
		const { url, codeVerifier, state } =
			twtrClient_o2.generateOAuth2AuthLink(
				`${process.env.HOST}/auth/callback?callbackType=twitter`,
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

		console.log(state)

		return { url, codeVerifier, state }
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = twitterAuthFlow
