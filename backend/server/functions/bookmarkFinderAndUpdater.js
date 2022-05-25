/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

/**
 * A function that finds the tweet & updates its meta.
 *
 * @param {String} bookmarkId
 * @param {[import('../utils/schemas/Tag').TagDocument]} tags
 * @param {String} type
 * @param {String} profile_id
 */
const bookmarkFinderAndUpdater = async (
    bookmarkId = undefined,
    tags = undefined,
    profile_id = undefined,
    tagId = undefined
) => {
    try {
        if (tags.length && tweetId) {
            const foundBookmark = await Bookmark.findById(bookmarkId).exec()

            foundBookmark.tags = tags

            return await foundBookmark.save()
        }

        if (profile_id && tagId) {
            const userBookmarks = await Bookmark.find({
                profile_id: profile_id,
            }).exec()

            userBookmarks.forEach((bookmark) => {
                const tagIndex = bookmark.tags.indexOf(tagId)

                bookmark.tags.splice(tagIndex, 1)
            })

            await userBookmarks.save()
        }
    } catch (error) {
        throw new Error('Error while finding & updating a bookmark.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = bookmarkFinderAndUpdater
