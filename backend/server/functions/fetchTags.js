/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that fetches tags of a particular user.
 *
 * @param {String} profile_id
 */
const fetchTags = async (profile_id) => {
    try {
        mixpanel.track('Fetch tags', {
            distinct_id: profile_id,
        })

        return await Tag.find({ profile_id: profile_id }).lean().exec()
    } catch (error) {
        throw new Error('Error while fetching tags.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = fetchTags
