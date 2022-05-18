const { TweetEntityHashtagV2, TweetV2 } = require('twitter-api-v2')

const tagFindOrCreate = require('./tagFindOrCreate'),
    bookmarkCreate = require('./bookmarkCreate')

/**
 * A function to bookmark a tweet with the specified tags.
 *
 * @param {} user
 * @param {String} requestedTweetId
 * @param {TweetEntityHashtagV2[]} tags
 */
const bookmark = async (user, requestedTweetId, tags = null) => {
    try {
        if (
            user.unreadCount >=
            user.bookmarks.filter(({ read }) => read === false).length()
        )
            return false

        let bookmarkTags = []

        if (tags.length)
            for (const { tag } of tags) {
                const savedTag = await tagFindOrCreate(tag, user)

                bookmarkTags.push(savedTag)
            }

        const savedBookmark = await bookmarkCreate(
            user.profile_id,
            requestedTweetId,
            bookmarkTags
        )

        user.bookmarks.push(savedBookmark)

        await user.save()

        return true
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = bookmark
