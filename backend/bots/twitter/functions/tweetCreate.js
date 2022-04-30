const Tweet = require('../utils/schema/Tweet')

/**
 * A function to save the tweet in the database.
 *
 * @param {String} profile_id
 * @param {String} status_id
 * @param {[]} tags
 */
const tweetCreate = async (profile_id, status_id, tags = null) => {
	try {
		return await Tweet.create({
			profile_id: profile_id,
			status_id: status_id,
			tags: tags,
		})
	} catch (error) {
		console.log('ERROR: ', error)
	}
}

module.exports = tweetCreate
