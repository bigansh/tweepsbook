/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that finds a bookmark & then deletes it.
 *
 * @param {String} bookmarkId
 */
const deleteBookmark = async (bookmarkId) => {
    try {
        await Bookmark.findByIdAndDelete(bookmarkId).exec()

        return true
    } catch (error) {
        throw new Error('Error while deleting a bookmark.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = deleteBookmark
