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
        console.log(error)
    }
}

module.exports = updateReadStatus
