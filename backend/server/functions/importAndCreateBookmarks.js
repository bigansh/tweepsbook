const User = require('../utils/schema/User'),
	Tweet = require('../utils/schema/Tweet')

/**
 * A function that imports bookmarks from a user's Twitter account & adds it to the DB.
 *
 * @param {import('twitter-api-v2').TwitterApi} userTwtrClient
 * @param {String} profile_id
 */
const importAndCreateBookmarks = async (userTwtrClient, profile_id) => {
	try {
		const importedBookmarks = await userTwtrClient.v2.bookmarks()

		for await (const tweet of importedBookmarks) {
			const foundTweet = await Tweet.findOne({
				profile_id: profile_id,
				status_id: tweet.id,
			}).exec()

			if (!foundTweet) {
				const createdTweet = await Tweet.create({
					profile_id: profile_id,
					status_id: tweet.id,
				})

				const user = await User.findOne({ profile_id: profile_id }).exec()

				user.tweets.push(createdTweet)

				return await user.save()
			}
		}
	} catch (error) {}
}

module.exports = importAndCreateBookmarks
