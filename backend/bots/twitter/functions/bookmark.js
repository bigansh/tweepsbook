const { TweetEntityHashtagV2 } = require('twitter-api-v2')

const tagFindOrCreate = require('./tagFindOrCreate'),
    bookmarkCreate = require('./bookmarkCreate')

/**
 * A function to bookmark a tweet with the specified tags.
 *
 * @param {import('../utils/schemas/User').UserDocument} user
 * @param {String} requestedTweetId
 * @param {String} tweetText
 * @param {TweetEntityHashtagV2[]} tags
 */
const bookmark = async (user, requestedTweetId, tweetText, tags = null) => {
    try {
        const unreadBookmarks = user.bookmarks.filter(
            (bookmark) => bookmark.read === false
        ).length

        if (user.unreadCount >= unreadBookmarks && user.unreadCount != 0)
            return false

        /**
         * @type {import('../utils/schemas/Tag').TagDocument[]}
         */
        let bookmarkTags = []

        if (tags.length)
            for (const { tag } of tags) {
                const savedTag = await tagFindOrCreate(tag, user)

                bookmarkTags.push(savedTag)
            }

        const savedBookmark = await bookmarkCreate(
            user.profile_id,
            requestedTweetId,
            tweetText,
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
