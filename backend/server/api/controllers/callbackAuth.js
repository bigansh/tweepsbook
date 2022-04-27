const twitterCallback = require('../functions/twitterCallback')

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
			const { state, code } = req.params

			const { token } = req.query

			;(await twitterCallback(token, state, code)) &&
				res.status(302).redirect('/app/dashboard')
		}
	} catch (error) {}
}

module.exports = callbackAuth
