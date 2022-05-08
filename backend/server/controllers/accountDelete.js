const deleteAccount = require('../functions/deleteAccount')

/**
 * A controller to handle the requests to delete the account.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const accountDelete = async (req, res) => {
	try {
		const { profile_id } = req.user

		let data

		if (req.body.confirmation) data = await deleteAccount(profile_id)

		res.status(200).send(data)
	} catch (error) {
		console.log(error)
	}
}

module.exports = accountDelete
