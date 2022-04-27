/**
 * A controller to handle the requests to fetch the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const getBookmarks = (req, res) => {
	res.send('hello')
}

module.exports = getBookmarks
