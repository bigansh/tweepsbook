const cache = require('../utils/functions/nodeCache')

const twitterAuthFlow = require('../functions/twitterAuthFlow')

/**
 * A controller to handle the requests to to login via Twitter.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const twitterAuth = (req, res) => {
	const { url, state, codeVerifier } = twitterAuthFlow()

	cache.set('token', { state, codeVerifier }, 10)

	res.status(302).redirect(url)
}

module.exports = twitterAuth
