const { fastify } = require('fastify')

const twtrClient_o1 = require('../utils/auth/oauth1.0a')

const User = require('../utils/schema/User')

const twitterUserFinder = require('../functions/twitterUserFinder')

const app = fastify()

/**
 * A function that handles callbacks for Twitter.
 *
 * @param {String} token
 * @param {String} state
 * @param {String} code
 */
const twitterCallback = async (token, state, code) => {
	try {
		const { state: sessionState, codeVerifier } = app.jwt.decode(token)

		// ! Redirect to an error page if any of the tokens are invalid.
		if (!codeVerifier || !state || !sessionState || !code)
			throw new Error('You denied the app or your session expired!')

		if (state !== sessionState) throw new Error("Stored tokens didn't match!")

		const {
			client: loggedClient,
			accessToken,
			refreshToken,
		} = await twtrClient_o1.loginWithOAuth2({
			code,
			codeVerifier,
			redirectUri: '/auth/callback',
		})

		const { data: userObject } = await loggedClient.v2.me()

		await twitterUserFinder(userObject)

		User.findOneAndUpdate(
			{ twitter_id: userObject.id },
			{
				twitter_auth_tokens: {
					accessToken: accessToken,
					refreshToken: refreshToken,
				},
			}
		)

		return true
	} catch (error) {}
}

module.exports = twitterCallback
