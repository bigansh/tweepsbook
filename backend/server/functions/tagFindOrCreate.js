const Tag = require('../utils/schemas/Tag')

/**
 * A function that finds if a tag is present in the database & creates one if needed.
 *
 * @param {[String]} tags
 * @param {*} user
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
				const createdTag = await Tag.create({ tag, profile_id })

				user.tags.push(createdTag)

				await user.save()

				bookmarkTags.push(createdTag)
			} else bookmarkTags.push(foundTag)
		}

		return bookmarkTags
	} catch (error) {
		console.log(error)
	}
}

module.exports = tagFindOrCreate
