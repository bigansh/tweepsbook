const { v4: uuidV4 } = require('uuid')

/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that creates a new user document.
 *
 * @param {import('twitter-api-v2').UserV2} twitterUserObject
 */
const userCreate = async (twitterUserObject = undefined) => {
	try {
		if (twitterUserObject) {
			const profile_id = uuidV4()

			mixpanel.track('Sign up', {
				distinct_id: profile_id,
				$name: twitterUserObject.name,
				$created: new Date(),
				$avatar: twitterUserObject.profile_image_url,
			})

			mixpanel.track('Import Twitter bookmarks', {
				distinct_id: profile_id,
			})

			mixpanel.people.increment(profile_id, 'Import Twitter bookmarks', 0)

			return await User.create({
				twitter_id: twitterUserObject.id,
				profile_image: twitterUserObject.profile_image_url,
				name: twitterUserObject.name,
				profile_id: profile_id,
				// email: twitterUserObject.email, // ! Need to figure out how to get the user email.
			})
		}
	} catch (error) {
		throw new Error(error)
	}
}

module.exports = userCreate
