const deleteBookmark = require('../functions/deleteBookmark'),
	deleteTag = require('../functions/deleteTag')

/**
 * A controller to handle the requests to delete the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdDelete = async (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'bookmark':
				if (req.body.bookmarkId)
					data = await deleteBookmark(req.body.bookmarkId, profile_id)

				break
			case 'tag':
				if (req.body.tagId)
					data = await deleteTag(req.body.tagId, profile_id)

				break
		}

		res.status(200).send(data)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = curdDelete
