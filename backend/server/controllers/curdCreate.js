const createTwtrUserClient = require('../functions/createTwtrUserClient'),
	importAndCreateBookmarks = require('../functions/importAndCreateBookmarks')

/**
 * A controller that handles the requests to import bookmarks from the account.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdCreate = async (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'twitter':
				const userTwtrClient = await createTwtrUserClient(profile_id)

				data = await importAndCreateBookmarks(
					userTwtrClient,
					profile_id
				)

				break
		}

		res.status(200).send(data)
	} catch (error) {
		console.log(error)
	}
}

module.exports = curdCreate
