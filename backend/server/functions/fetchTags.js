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
        console.log(error)
    }
}

module.exports = fetchTags
