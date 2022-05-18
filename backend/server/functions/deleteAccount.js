/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that deletes the account.
 *
 * @param {String} profile_id
 */
const deleteAccount = async (profile_id) => {
    try {
        await User.findOneAndDelete({ profile_id: profile_id }).exec()

        return true
    } catch (error) {
        console.log(error)
    }
}

module.exports = deleteAccount
