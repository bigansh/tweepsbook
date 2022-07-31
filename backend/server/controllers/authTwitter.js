const cache = require('../utils/classes/nodeCache')

const twitterAuthFlow = require('../functions/twitterAuthFlow')

/**
 * A controller to handle the requests to login via Twitter.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const authTwitter = (req, res) => {
	try {
		const { email } = req.query

		if (!email) throw new Error('Please enter an email address.')

		const { url, state, codeVerifier } = twitterAuthFlow(email)

		const authObjects = { state, codeVerifier } || {}

		cache.set('token', authObjects, 100)

		res.status(302).redirect(url)
	} catch (error) {
		throw error
	}
}

module.exports = authTwitter
