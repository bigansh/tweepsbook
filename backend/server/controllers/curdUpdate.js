const tagsValidator = require('../utils/validators/tagsValidator'),
	readStatusValidator = require('../utils/validators/readStatusValidator'),
	shareStatusValidator = require('../utils/validators/shareStatusValidator')

const updateTags = require('../functions/updateTags'),
	updateReadStatus = require('../functions/updateReadStatus'),
	updateShareStatus = require('../functions/updateShareStatus')

/**
 * A controller to handle the requests to update the bookmarks.
 *
 * @param {import('fastify').FastifyRequest} req
 * @param {import('fastify').FastifyReply} res
 */
const curdUpdate = async (req, res) => {
	try {
		const { queryType } = req.query

		const { profile_id } = req.user

		let data

		switch (queryType) {
			case 'tags':
				if (req.body.bookmarkId && req.body.tags) {
					const validatedTags = tagsValidator(req.body.tags)

					if (validatedTags.error)
						throw new Error(validatedTags.error.message)

					data = await updateTags(
						profile_id,
						req.body.bookmarkId,
						validatedTags.value
					)
				}

				break
			case 'readStatus':
				if (req.body.bookmarkId && req.body.readStatus) {
					const validatedReadStatus = readStatusValidator(
						req.body.readStatus
					)

					if (validatedReadStatus.error)
						throw new Error(validatedReadStatus.error.message)

					data = await updateReadStatus(
						req.body.bookmarkId,
						validatedReadStatus.value,
						profile_id
					)
				}

				break
			case 'shareStatus':
				if (req.body.bookmarkId && req.body.shareStatus) {
					const validatedShareStatus = shareStatusValidator(
						req.body.shareStatus
					)

					if (validatedShareStatus.error)
						throw new Error(validatedShareStatus.error.message)

					data = await updateShareStatus(
						req.body.bookmarkId,
						validatedShareStatus.value,
						profile_id
					)
				}
		}

		res.status(200).send(data)
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = curdUpdate
