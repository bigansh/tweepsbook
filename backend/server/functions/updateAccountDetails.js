const User = require('../utils/schemas/User')

// const accountDetails = require('../utils/models/accountDetails')

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
        console.log(error)
    }
}

module.exports = updateAccountDetails
