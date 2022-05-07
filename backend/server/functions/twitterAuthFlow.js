const twtrClient_o2 = require('../utils/auth/oauth2.0')

/**
 * A function to handle the 3-legged authentication for Twitter.
 */
const twitterAuthFlow = () => {
	const { url, codeVerifier, state } = twtrClient_o2.generateOAuth2AuthLink(
		'http://127.0.0.1:3000/auth/callback?callbackType=twitter',
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
}

module.exports = twitterAuthFlow
