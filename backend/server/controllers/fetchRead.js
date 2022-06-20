const publicBookmark = require('../functions/publicBookmark')

/**
 * A controller to handle the public requests to fetch the bookmarks
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const fetchRead = async (req, res) => {
	try {
		const { queryType } = req.query

		let data

		switch (queryType) {
			case 'bookmark':
				if (req.query.bookmarkId)
					data = await publicBookmark(req.query.bookmarkId)

				break
		}

		res.code(200).send(data)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = fetchRead
