/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function to save the tweet in the database.
 *
 * @param {String} profile_id
 * @param {String} status_id
 * @param {String} twitter_text
 * @param {import('../utils/schemas/Tag').TagDocument[]} tags
 */
const bookmarkCreate = async (profile_id, status_id, twitter_text, tags = null) => {
    try {
        const createdBookmark = await Bookmark.create({
            profile_id: profile_id,
            twitter_status_id: status_id,
            content: twitter_text,
            tags: tags,
        })

        mixpanel.track('Create bookmark', {
            distinct_id: profile_id,
            bookmarkId: createdBookmark._id,
            bookmark_type: 'Twitter',
        })

        return createdBookmark
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = bookmarkCreate
