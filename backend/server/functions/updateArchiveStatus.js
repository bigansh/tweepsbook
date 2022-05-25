/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that updates the archive status of a bookmark.
 *
 * @param {String} bookmarkId
 * @param {Boolean} status
 */
const updateArchiveStatus = async (bookmarkId = undefined, status) => {
    try {
        if (bookmarkId)
            return await Bookmark.findByIdAndUpdate(
                bookmarkId,
                { archived: status },
                { new: true }
            )
                .lean()
                .exec()
    } catch (error) {
        throw new Error('Error while updating the archive status of a bookmark.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = updateArchiveStatus
