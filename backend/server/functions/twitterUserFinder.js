/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const userCreate = require('./userCreate')

/**
 * A function that checks if a user is present & creates a document if needed.
 *
 * @param {import('twitter-api-v2').UserV2} user
 */
const twitterUserFinder = async (user) => {
    try {
        const foundUser = await User.findOneAndUpdate(
            { twitter_id: user.id },
            {
                profile_image: user.profile_image_url,
                name: user.name,
            },
            { new: true }
        )
            .lean()
            .exec()

        if (!foundUser) return await userCreate(user)

        return foundUser
    } catch (error) {
        throw new Error('Error while finding a user.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = twitterUserFinder
