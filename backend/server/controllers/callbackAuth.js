const { fastify } = require('fastify')

const twitterCallback = require('../functions/twitterCallback')

const app = fastify()

/**
 * A controller to handle the callback requests for authentication.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const callbackAuth = async (req, res) => {
	try {
		const { twitter } = req.query

		if (twitter) {
			const { state, code } = req.query

			const { token } = req.query

			const { profile_id } = await twitterCallback(token, state, code)

			const sessionToken = app.jwt.sign(profile_id, {
				expiresIn: 1000 * 60 * 60 * 24 * 14, // * 14 days
			})

			res
				.status(302)
				.header('sessionToken', sessionToken)
				.redirect('/app/dashboard')
		}
	} catch (error) {}
}

module.exports = callbackAuth
