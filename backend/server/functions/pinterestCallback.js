/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that handles callback request for Pinterest.
 *
 * @param {String} profile_id
 */
const pinterestCallback = async (profile_id) => {
    try {
        const foundUser = await User.findOne({ profile_id: profile_id }).exec()
    } catch (error) {
        console.log(error)
    }
}

module.exports = pinterestCallback
