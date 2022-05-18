const User = require('../utils/schemas/User'),
    Bookmark = require('../utils/schemas/Bookmark'),
    Tag = require('../utils/schemas/Tag')

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
        if (twtrUserClient) {
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

                    const user = await User.findOne({
                        profile_id: profile_id,
                    }).exec()

                    user.bookmarks.push(createdBookmark)

                    await user.save()
                }
            }

            const userBookmarks = await Bookmark.find({
                    profile_id: profile_id,
                })
                    .lean()
                    .exec(),
                userTags = await Tag.find({ profile_id: profile_id })
                    .lean()
                    .exec()

            return { userBookmarks, userTags }
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = importAndCreateBookmarks
