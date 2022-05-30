/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * @type {import('mixpanel')}
 */
const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that updates the account details.
 *
 * @param {String} profile_id
 * @param {import('../utils/models/accountDetails')} accountDetails
 */
const updateAccountDetails = async (profile_id, accountDetails) => {
    try {
        mixpanel.track('Update account details', {
            distinct_id: profile_id,
        })

        if (accountDetails.email)
            mixpanel.people.set(profile_id, {
                $email: accountDetails.email,
            })

        return await User.findOneAndUpdate(
            { profile_id: profile_id },
            accountDetails,
            {
                new: true,
            }
        )
            .select(['-bookmarks', '-tags', '-twitter_auth_tokens'])
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
