/**
 * @type {import('../utils/schemas/User').UserModel}
 */
const User = require('../utils/schemas/User')

/**
 * A function that checks for the existence of a user in the database.
 *
 * @param {String} twitter_id
 */
const userFind = async (twitter_id) => {
	try {
		return await User.findOne({ twitter_id: twitter_id }).exec()
	} catch (error) {
		console.log(error)
	}
}

module.exports = userFind
