/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that updates the account details.
 *
 * @param {String} profile_id
 * @param {import('../utils/models/accountDetails')} accountDetails
 */
const updateAccountDetails = async (profile_id, accountDetails) => {
    try {
        return await User.findOneAndUpdate(
            { profile_id: profile_id },
            accountDetails,
            {
                new: true,
            }
        )
            .lean()
            .exec()
    } catch (error) {
        throw new Error("Error while updating a user's details", {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = updateAccountDetails
