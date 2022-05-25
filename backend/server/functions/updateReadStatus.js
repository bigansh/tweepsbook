/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that updates the read status of a bookmark.
 *
 * @param {String} bookmarkId
 * @param {Boolean} status
 */
const updateReadStatus = async (bookmarkId = undefined, status) => {
    try {
        if (tweetId)
            return await Bookmark.findByIdAndUpdate(
                bookmarkId,
                { read: status },
                { new: true }
            )
                .lean()
                .exec()
    } catch (error) {
        throw new Error('Error while updating the read status of a bookmark.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = updateReadStatus
