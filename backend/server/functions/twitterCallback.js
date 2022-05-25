require('dotenv').config()

const twtrClient_o2 = require('../utils/auth/oauth2.0')

/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const twitterUserFinder = require('../functions/twitterUserFinder')

/**
 * A function that handles callbacks for Twitter.
 *
 * @param {String} sessionState
 * @param {String} codeVerifier
 * @param {String} state
 * @param {String} code
 */
const twitterCallback = async (sessionState, codeVerifier, state, code) => {
    try {
        if (!codeVerifier || !state || !sessionState || !code)
            throw new Error('You denied the app or your session expired!')

        if (state !== sessionState)
            throw new Error("Stored tokens didn't match!")

        const {
            client: loggedClient,
            accessToken,
            refreshToken,
        } = await twtrClient_o2.loginWithOAuth2({
            code,
            codeVerifier,
            redirectUri: `${process.env.HOST}/auth/callback?callbackType=twitter`,
        })

        const { data: userObject } = await loggedClient.v2.me()

        const user = await twitterUserFinder(userObject)

        await User.findOneAndUpdate(
            { twitter_id: userObject.id },
            {
                twitter_auth_tokens: {
                    accessToken: accessToken,
                    refreshToken: refreshToken,
                },
            }
        )
            .lean()
            .exec()

        return user
    } catch (error) {
        throw new Error('Error while authenticating a user via Twitter.', {
            statusCode: 500,
            error: error,
        })
    }
}

module.exports = twitterCallback
