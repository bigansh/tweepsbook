const twtrClient_o1 = require('../utils/auth/oauth1.0a')

/**
 * A function to handle the 3-legged authentication for Twitter.
 */
const twitterAuthFlow = () => {
	const { callbackUrl, codeVerifier, state } =
		twtrClient_o1.generateOAuth2AuthLink('/auth/callback?twitter=true', {
			scope: [
				'users.read',
				'bookmark.read',
				'bookmark.write',
				'offline.access',
				'tweet.read'
			],
		})

	return { callbackUrl, codeVerifier, state }
}

module.exports = twitterAuthFlow
