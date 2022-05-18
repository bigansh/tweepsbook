/**
 * @type {import('../utils/schemas/Tag').TagModel}
 */
const Tag = require('../utils/schema/Tag')

/**
 * A function to find if a hashtag exists & create a new if needed.
 *
 * @param {String} tag
 * @param {import('../utils/schemas/User').UserDocument} user
 */
const tagFindOrCreate = async (tag, user) => {
    try {
        const foundTag = await Tag.findOne({
            tag: tag,
            profile_id: user.profile_id,
        }).exec()

        if (!foundTag) {
            const createdTag = await Tag.create({ tag, profile_id })

            user.tags.push(createdTag)

            user.save()

            return createdTag
        }

        return foundTag
    } catch (error) {}
}

module.exports = tagFindOrCreate
