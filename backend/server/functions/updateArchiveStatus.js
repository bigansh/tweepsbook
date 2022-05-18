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
        console.log(error)
    }
}

module.exports = updateArchiveStatus
