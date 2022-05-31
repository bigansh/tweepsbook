/**
 * A function that checks if the import is allowed or not.
 *
 * @param {String} importType
 * @param {import('../utils/schemas/User').UserDocument} user
 */
const importValidation = async (importType, user) => {
    try {
        const unreadBookmarks = user.bookmarks.filter(
            (bookmark) => bookmark.read === false
        ).length

        if (
            user.unreadCount >= unreadBookmarks &&
            user.unreadCount != 0 &&
            user.importCount.twitter != 0 &&
            importType === 'twitter'
        )
            throw new Error(
                'Please read some bookmarks before importing new ones.'
            )

        return true
    } catch (error) {
        throw new Error(error, {
            statusCode: 405,
        })
    }
}

module.exports = importValidation
