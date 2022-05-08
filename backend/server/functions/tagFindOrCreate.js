const Tag = require('../utils/schema/Tag')

/**
 * A function that finds if a tag is present in the database & creates one if needed.
 *
 * @param {[String]} tags
 * @param {*} user
 */
const tagFindOrCreate = async (tags, user) => {
	try {
		const tweetTags = []

		for (const tag of tags) {
			const foundTag = await Tag.findOne({
				tag: tag,
				profile_id: user.profile_id,
			}).exec()

			if (!foundTag) {
				const createdTag = await Tag.create({ tag, profile_id })

				user.tags.push(createdTag)

				user.save()

				tweetTags.push(createdTag)
			} else tweetTags.push(foundTag)
		}

		return tweetTags
	} catch (error) {
		console.log(error)
	}
}

module.exports = tagFindOrCreate
