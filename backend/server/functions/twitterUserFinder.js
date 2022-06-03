/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const mixpanel = require('../utils/auth/mixpanelConnect')

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

		if (foundUser) {
			mixpanel.track('Log in', {
				distinct_id: foundUser.profile_id,
				date: new Date(),
			})

			mixpanel.people.set(foundUser.profile_id, {
				$avatar: user.profile_image_url,
				$name: user.name,
			})
		}

		if (!foundUser) return await userCreate(user)

		return foundUser
	} catch (error) {
		throw new Error(error, {
			statusCode: 502,
		})
	}
}

module.exports = twitterUserFinder
