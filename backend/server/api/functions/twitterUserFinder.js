const User = require('../utils/schema/User')

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

		if (foundUser.length === 0) await userCreate(user)
	} catch (error) {}
}

module.exports = twitterUserFinder
