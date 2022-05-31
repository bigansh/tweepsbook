/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that deletes the account.
 *
 * @param {String} profile_id
 */
const deleteAccount = async (profile_id) => {
    try {
        await User.findOneAndDelete({ profile_id: profile_id }).exec()

        mixpanel.people.delete_user(profile_id)

        return true
    } catch (error) {
        throw new Error(error, {
            statusCode: 502,
        })
    }
}

module.exports = deleteAccount
