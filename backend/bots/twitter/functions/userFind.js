/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schema/User')

/**
 * A function that checks for the existence of a user in the database.
 *
 * @param {String} twitter_id
 */
const userFind = async (twitter_id) => {
    try {
        return await User.findOne({ twitter_id: twitter_id }).exec()
    } catch (error) {
        console.log('ERROR: ', error)
    }
}

module.exports = userFind
