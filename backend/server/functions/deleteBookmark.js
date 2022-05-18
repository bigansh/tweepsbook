const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that finds a bookmark & then deletes it.
 *
 * @param {String} bookmarkId
 */
const deleteBookmark = async (bookmarkId) => {
    try {
        return await Bookmark.findByIdAndDelete(bookmarkId).exec()
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteBookmark
