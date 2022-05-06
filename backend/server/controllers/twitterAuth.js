const { fastify } = require('fastify')

const twitterAuthFlow = require('../functions/twitterAuthFlow')

const app = fastify()

// TODO Get JWT auth completed (store JWT token).

/**
 * A controller to handle the requests to to login via Twitter.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const twitterAuth = (req, res) => {
	const { callbackUrl, state, codeVerifier } = twitterAuthFlow()

	const token = app.jwt.sign({ state, codeVerifier })

	res.redirect(302, `${callbackUrl}&token=${token}`)
}

module.exports = twitterAuth
