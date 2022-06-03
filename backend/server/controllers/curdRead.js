const fetchBookmarks = require('../functions/fetchBookmarks'),
	fetchTags = require('../functions/fetchTags')

/**
 * A controller to handle the requests to fetch the bookmarks, tags, etc..
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdRead = async (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'bookmarks':
				data = await fetchBookmarks(profile_id)

				break
			case 'tags':
				data = await fetchTags(profile_id)

				break
		}

		res.status(200).send(data)
	} catch (error) {
		console.log(error)
	}
}

module.exports = curdRead
