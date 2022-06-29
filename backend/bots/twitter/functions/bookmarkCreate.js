/**
 * @type {import('../utils/schemas/Bookmark').BookmarkModel}
 */
const Bookmark = require('../utils/schemas/Bookmark')

const mixpanel = require('../utils/auth/mixpanelConnect'),
    sendgrid = require('../utils/auth/sendgridConnect')

/**
 * A function to save the tweet in the database.
 *
 * @param {String} profile_id
 * @param {String} status_id
 * @param {String} bookmarkMethod
 * @param {import('../utils/schemas/Tag').TagDocument[]} tags
 */
const bookmarkCreate = async (profile_id, status_id, bookmarkMethod, tags = null) => {
    try {
        const createdBookmark = await Bookmark.create({
            profile_id: profile_id,
            twitter_status_id: status_id,
            tags: tags,
            bookmarkSource: 'twitter'
        })

        mixpanel.track('Create bookmark', {
            distinct_id: profile_id,
            bookmarkId: createdBookmark._id,
            bookmark_type: 'Twitter',
            bookmark_method: bookmarkMethod
        })

        return createdBookmark
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = bookmarkCreate
