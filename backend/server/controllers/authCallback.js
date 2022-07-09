require('dotenv').config()

const passport = require('passport')

const cache = require('../utils/classes/nodeCache')

const twitterCallback = require('../functions/twitterCallback')

/**
 * A controller to handle the callback requests for authentication.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const authCallback = async (req, res) => {
	try {
		const { callbackType } = req.query

		switch (callbackType) {
			case 'twitter':
				const { state, code } = req.query

				const { state: sessionState, codeVerifier } =
					cache.take('token')

				console.log(sessionState)

				const { profile_id } = await twitterCallback(
					sessionState,
					codeVerifier,
					state,
					code
				)

				const sessionToken = await res.jwtSign(
					{ profile_id },
					{
						expiresIn: 1000 * 60 * 60 * 24 * 14, // * 14 days
					}
				)

				res.status(302).redirect(
					`${process.env.CLIENT}/app/callback?sessionToken=${sessionToken}`
				)

				break
			case 'reddit':
				passport.authenticate('reddit', {
					// ? What to do on failure?
				})

				break
			case 'pinterest':
				passport.authenticate('pinterest', {
					// ? What to do on failure?
				})

				break
		}
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = authCallback
