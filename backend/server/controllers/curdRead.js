const fetchBookmarks = require('../functions/fetchBookmarks'),
	fetchTags = require('../functions/fetchTags'),
	fetchBookmark = require('../functions/fetchBookmark')

/**
 * A controller to handle the requests to fetch the bookmarks, tags, etc...
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
			case 'bookmark':
				if (req.query.bookmarkId)
					data = await fetchBookmark(profile_id, req.query.bookmarkId)

				break
		}

		res.status(200).send(data)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = curdRead
