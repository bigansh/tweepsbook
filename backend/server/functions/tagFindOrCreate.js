/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schemas/Tag')

const mixpanel = require('../utils/auth/mixpanelConnect')

/**
 * A function that finds if a tag is present in the database & creates one if needed.
 *
 * @param {String[]} tags
 * @param {import('../utils/schemas/User').UserDocument} user
 */
const tagFindOrCreate = async (tags, user) => {
	try {
		const bookmarkTags = []

		for (const tag of tags) {
			const foundTag = await Tag.findOne({
				tag: tag,
				profile_id: user.profile_id,
			}).exec()

			if (!foundTag) {
				const createdTag = await Tag.create({
					tag: tag,
					profile_id: user.profile_id,
				})

				user.tags.push(createdTag)

				await user.save()

				bookmarkTags.push(createdTag)

				mixpanel.track('Create tag', {
					distinct_id: user.profile_id,
					tag_name: tag,
				})
			} else bookmarkTags.push(foundTag)
		}

		return bookmarkTags
	} catch (error) {
		throw error
	}
}

module.exports = tagFindOrCreate
