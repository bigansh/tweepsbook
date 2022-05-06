const updateTags = require('../functions/updateTags'),
	updateReadStatus = require('../functions/updateReadStatus'),
	updateArchiveStatus = require('../functions/updateArchiveStatus')

/**
 * A controller to handle the requests to update the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdUpdate = (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'tags':
				data = await updateTags(profile_id, req.body.tweetId, req.body.tags)
			case 'readStatus':
				data = await updateReadStatus(req.body.tweetId, req.body.readStatus)
			case 'archiveStatus':
				data = await updateArchiveStatus(req.body.tweetId, req.body.archiveStatus)
		}

		res.status(200).send(data)
	} catch (error) {}
}

module.exports = curdUpdate
