const tagsValidator = require('../utils/validators/tagsValidator'),
    readStatusValidator = require('../utils/validators/readStatusValidator'),
    archiveStatusValidator = require('../utils/validators/archiveStatusValidator')

const updateTags = require('../functions/updateTags'),
    updateReadStatus = require('../functions/updateReadStatus'),
    updateArchiveStatus = require('../functions/updateArchiveStatus')

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
            case 'readStatus':
                if (req.body.bookmarkId && req.body.readStatus) {
                    const validatedReadStatus = readStatusValidator(
                        req.body.readStatus
                    )

                    if (validatedReadStatus.error)
                        throw new Error(validatedReadStatus.error.message)

                    data = await updateReadStatus(
                        req.body.bookmarkId,
                        validatedReadStatus.value
                    )
                }
            case 'archiveStatus':
                if (req.body.bookmarkId && req.body.archiveStatus) {
                    const validatedArchiveStatus = archiveStatusValidator(
                        req.body.archiveStatus
                    )

                    if (validatedArchiveStatus.error)
                        throw new Error(validatedArchiveStatus.error.message)
                    data = await updateArchiveStatus(
                        req.body.bookmarkId,
                        validatedArchiveStatus.value
                    )
                }
        }

        res.status(200).send(data)
    } catch (error) {}
}

module.exports = curdUpdate
