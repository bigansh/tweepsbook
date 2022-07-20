/**
 * A controller to handle the requests to get the index route.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const indexRead = (req, res) => {
	try {
		data = {
			message:
				"You are a curious person, aren't you? Well, we admire your curiosity & would love to talk to you. Can you please DM Ansh on Twitter?",
			link: 'https://bigansh.ml/l/twitter/dm',
		}

		res.status(200).send(data)
	} catch (error) {
		throw error
	}
}

module.exports = indexRead
