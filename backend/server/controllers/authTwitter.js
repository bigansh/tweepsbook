const cache = require('../utils/classes/nodeCache')

const twitterAuthFlow = require('../functions/twitterAuthFlow')

/**
 * A controller to handle the requests to to login via Twitter.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const authTwitter = (req, res) => {
	try {
		const { url, state, codeVerifier } = twitterAuthFlow()

		const authObjects = { state, codeVerifier } || {}

		cache.set('token', authObjects, 100)

		res.status(302).redirect(url)
	} catch (error) {
		throw error
	}
}

module.exports = authTwitter
