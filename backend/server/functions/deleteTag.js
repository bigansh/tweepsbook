/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

const bookmarkFinderAndUpdater = require('./bookmarkFinderAndUpdater')

/**
 * A function that deletes the tag & removes it from all the bookmarks.
 *
 * @param {String} tagId
 * @param {String} profile_id
 */
const deleteTag = async (tagId, profile_id) => {
    try {
        await bookmarkFinderAndUpdater(undefined, undefined, profile_id, tagId)

        return await Tag.findByIdAndDelete(tagId).exec()
    } catch (error) {
        throw new Error('Error while deleting a tag.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = deleteTag
