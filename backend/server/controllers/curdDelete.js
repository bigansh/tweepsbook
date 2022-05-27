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
                if (req.body.tweetId)
                    data = await deleteBookmark(req.body.bookmarkId)
            case 'tag':
                if (req.body.tagId)
                    data = await deleteTag(req.body.tagId, profile_id)
        }

        res.status(200).send(data)
    } catch (error) {
        console.log(error)
    }
}

module.exports = curdDelete
