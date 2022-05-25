/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

/**
 * A function that fetches tags of a particular user.
 *
 * @param {String} profile_id
 */
const fetchTags = async (profile_id) => {
    try {
        return await Tag.find({ profile_id: profile_id }).lean().exec()
    } catch (error) {
        throw new Error('Error while fetching tags.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = fetchTags
