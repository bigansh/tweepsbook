const updateTags = require('../functions/updateTags')

/**
 * A controller to handle the requests to update the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const updateBookmark = (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'tags':
				data = await updateTags(profile_id, req.body.tweet_id, req.body.tags)
		}

		res.status(200).send(data)
	} catch (error) {}
}

module.exports = updateBookmark
