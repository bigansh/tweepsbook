/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User'),
    /**
     * @type {import('../utils/schemas/Bookmark').BookmarkModel}
     */
    Bookmark = require('../utils/schemas/Bookmark')

/**
 * @type {import('mixpanel')}
 */
const mixpanel = require('../utils/auth/mixpanelConnect')

const importValidation = require('./importValidation')

/**
 * A function that imports bookmarks from a user's account & adds it to the DB.
 *
 * @param {import('twitter-api-v2').TwitterApi} userTwtrClient
 * @param {String} profile_id
 */
const importAndCreateBookmarks = async (
    userTwtrClient = undefined,
    profile_id
) => {
    try {
        if (userTwtrClient) {
            const user = await User.findOne({
                profile_id: profile_id,
            })
                .select(['bookmarks', 'importCount'])
                .exec()

            importValidation('twitter', user)

            const importedBookmarks = await userTwtrClient.v2.bookmarks()

            for await (const tweet of importedBookmarks) {
                const foundBookmark = await Bookmark.findOne({
                    profile_id: profile_id,
                    twitter_status_id: tweet.id,
                }).exec()

                if (!foundBookmark) {
                    const createdBookmark = await Bookmark.create({
                        profile_id: profile_id,
                        twitter_status_id: tweet.id,
                    })

                    user.bookmarks.push(createdBookmark)

                    await user.save()

                    mixpanel.track('Create bookmark', {
                        distinct_id: profile_id,
                        bookmarkId: createdBookmark._id,
                        bookmark_type: 'Twitter',
                    })
                }
            }

            mixpanel.track('Import bookmarks', {
                distinct_id: profile_id,
                import_type: 'Twitter',
            })

            return true
        }
    } catch (error) {
        throw new Error('Error while importing & creating bookmarks.', {
            statusCode: 501,
            error: error,
        })
    }
}

module.exports = importAndCreateBookmarks
