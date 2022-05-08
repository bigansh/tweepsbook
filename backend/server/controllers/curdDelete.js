const deleteTweet = require('../functions/deleteTweet'),
	deleteTag = require('../functions/deleteTag')

/**
 * A controller to handle the requests to delete the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdDelete = async (req, res) => {
	try {
		const { deleteType } = req.params

		const { profile_id } = req.user

		let data

		switch (deleteType) {
			case 'tweet':
				if (req.body.tweetId) data = await deleteTweet(req.body.tweetId)
			case 'tag':
				if (req.body.tweetId && req.body.profile_id)
					data = await deleteTag(req.body.tagId, profile_id)
		}

		res.status(200).send(data)
	} catch (error) {
		console.log(error)
	}
}

module.exports = curdDelete
