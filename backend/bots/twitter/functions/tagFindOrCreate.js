const Tag = require('../utils/schema/Tag')

/**
 * A function to find if a hashtag exists & create a new if needed.
 *
 * @param {String} tag
 * @param {BigInt} profile_id
 */
const tagFindOrCreate = async (tag, profile_id) => {
	const tag = await Tag.findOne({ tag, profile_id }).exec()

	if (!tag) {
		return await Tag.create({ tag, profile_id })
	} else return null
}

module.exports = tagFindOrCreate
