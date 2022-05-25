const { v4: uuidV4 } = require('uuid')

/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that creates a new user document.
 *
 * @param {import('twitter-api-v2').UserV2} twitterUserObject
 */
const userCreate = async (twitterUserObject = undefined) => {
    try {
        if (twitterUserObject)
            return await User.create({
                twitter_id: twitterUserObject.id,
                profile_image: twitterUserObject.profile_image_url,
                name: twitterUserObject.name,
                profile_id: uuidV4(),
                // email: twitterUserObject.email, // ! Need to figure out how to get the user email.
            })
    } catch (error) {
        throw new Error('Error while creating a new user.', {
            statusCode: 502,
            error: error,
        })
    }
}

module.exports = userCreate
