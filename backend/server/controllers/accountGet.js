const fetchAccount = require('../functions/fetchAccount')

/**
 * A controller to handle the requests to get the details of the account.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const accountGet = async (req, res) => {
	try {
		const { profile_id } = req.user

		let data

		data = await fetchAccount(profile_id)

		res.status(200).send(data)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = accountGet
