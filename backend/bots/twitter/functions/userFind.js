const User = require('../utils/schema/User')

// TODO Define the type of user in-relate to the schema User.
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
