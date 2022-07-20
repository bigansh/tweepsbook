/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function to find if a hashtag exists & create a new if needed.
 *
 * @param {String} tag
 * @param {import('../utils/schemas/User').UserDocument} user
 */
const tagFindOrCreate = async (tag, user) => {
	try {
		const foundTag = await Tag.findOne({
			tag: `#${tag}`,
			profile_id: user.profile_id,
		}).exec()

		if (!foundTag) {
			const createdTag = await Tag.create({
				tag: `#${tag}`,
				profile_id: user.profile_id,
			})

			user.tags.push(createdTag)

			await user.save()

			mixpanel.track('Create tag', {
				distinct_id: user.profile_id,
				tag_name: tag,
			})

			return createdTag
		}

		return foundTag
	} catch (error) {
		console.log(error)
	}
}

module.exports = tagFindOrCreate
