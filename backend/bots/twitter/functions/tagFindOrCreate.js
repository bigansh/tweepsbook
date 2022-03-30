const Tag = require('../utils/schema/Tag')

/**
 * A function to find if a hashtag exists & create a new if needed.
 *
 * @param {String} tag
 * @param {String} profile_id
 */
const tagFindOrCreate = async (tag, profile_id) => {
	const foundTag = await Tag.findOne({ tag: tag, profile_id: profile_id }).exec()

	if (!foundTag) {
		return await Tag.create({ tag, profile_id })
	} else return null
}

module.exports = tagFindOrCreate
